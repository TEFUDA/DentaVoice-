import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Récupérer le profil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // Créer le profil s'il n'existe pas
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0],
          plan: 'free',
          transcriptions_this_month: 0,
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json({ error: 'Erreur création profil' }, { status: 500 })
      }

      return NextResponse.json({ user, profile: newProfile })
    }

    return NextResponse.json({ user, profile })

  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
