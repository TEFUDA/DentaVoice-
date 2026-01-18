import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CONFIG } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Récupérer les données du formulaire
    const formData = await request.formData()
    const audio = formData.get('audio') as Blob
    const module = formData.get('module') as string || 'consultation'
    const duration = parseInt(formData.get('duration') as string) || 0
    
    if (!audio) {
      return NextResponse.json({ error: 'Fichier audio manquant' }, { status: 400 })
    }

    // Vérifier les limites (plan gratuit)
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, transcriptions_this_month')
      .eq('id', user.id)
      .single()

    if (profile?.plan === 'free' && profile?.transcriptions_this_month >= CONFIG.limites.gratuit.transcriptionsParMois) {
      return NextResponse.json({ 
        error: 'Limite mensuelle atteinte. Passez au plan Pro pour des transcriptions illimitées.',
        upgrade: true 
      }, { status: 403 })
    }

    // 1. Transcription avec Groq Whisper
    const groqFormData = new FormData()
    groqFormData.append('file', audio, 'audio.webm')
    groqFormData.append('model', 'whisper-large-v3')
    groqFormData.append('language', 'fr')
    groqFormData.append('response_format', 'json')

    const transcriptionResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    })

    if (!transcriptionResponse.ok) {
      const errorText = await transcriptionResponse.text()
      console.error('Groq transcription error:', errorText)
      throw new Error('Erreur de transcription audio')
    }

    const { text: rawText } = await transcriptionResponse.json()

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Aucune parole détectée' }, { status: 400 })
    }

    // 2. Structuration avec LLM
    const structureResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: CONFIG.promptIA
          },
          {
            role: 'user',
            content: `Module: ${module}\n\nTransforme cette dictée en document structuré:\n\n${rawText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!structureResponse.ok) {
      console.error('Groq LLM error:', await structureResponse.text())
      throw new Error('Erreur de structuration')
    }

    const { choices } = await structureResponse.json()
    const structuredText = choices[0]?.message?.content || rawText

    // 3. Sauvegarder en base de données
    const { data: transcription, error: insertError } = await supabase
      .from('transcriptions')
      .insert({
        user_id: user.id,
        module,
        raw_text: rawText,
        structured_text: structuredText,
        audio_duration: duration,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      // Continue même si l'insertion échoue
    }

    // 4. Mettre à jour le compteur
    await supabase.rpc('increment_transcription_count', { user_id: user.id })

    return NextResponse.json({
      id: transcription?.id,
      raw_text: rawText,
      structured_text: structuredText,
      duration,
      module,
    })

  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur de traitement' },
      { status: 500 }
    )
  }
}
