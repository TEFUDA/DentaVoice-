'use client'

import { useState, useEffect } from 'react'
import { Mic, MicOff, FileText, Clock, Copy, Download, Check, Trash2 } from 'lucide-react'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useTranscription } from '@/hooks/useTranscription'
import { Button, Card, CardContent } from '@/components/ui'
import { CONFIG } from '@/lib/config'
import { cn, formatDateTime } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Transcription {
  id: string
  created_at: string
  module: string
  raw_text: string
  structured_text: string
  audio_duration: number
}

export default function DashboardPage() {
  const [selectedModule, setSelectedModule] = useState('consultation')
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([])
  const [selectedTranscription, setSelectedTranscription] = useState<Transcription | null>(null)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  // Hooks
  const { transcribe, isProcessing, result, error: transcriptionError, reset } = useTranscription({
    module: selectedModule,
    onSuccess: (res) => {
      loadTranscriptions()
    },
  })

  const { isRecording, formattedDuration, error: recordingError, startRecording, stopRecording } = useAudioRecorder({
    onRecordingComplete: async (blob, duration) => {
      await transcribe(blob, duration)
    },
    maxDuration: 300,
  })

  // Charger les transcriptions
  const loadTranscriptions = async () => {
    const { data } = await supabase
      .from('transcriptions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) {
      setTranscriptions(data)
    }
  }

  useEffect(() => {
    loadTranscriptions()
  }, [])

  // Copier le texte
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Supprimer une transcription
  const handleDelete = async (id: string) => {
    await supabase.from('transcriptions').delete().eq('id', id)
    setTranscriptions(transcriptions.filter(t => t.id !== id))
    if (selectedTranscription?.id === id) {
      setSelectedTranscription(null)
    }
  }

  const displayedResult = result?.structured_text || selectedTranscription?.structured_text

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Zone d'enregistrement */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sélection module */}
          <Card variant="bordered">
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Type de document</h3>
              <div className="flex flex-wrap gap-2">
                {CONFIG.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition',
                      selectedModule === module.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {module.nom}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bouton micro */}
          <Card variant="elevated" className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={cn(
                    'relative w-32 h-32 rounded-full transition-all duration-300',
                    isRecording
                      ? 'bg-red-500'
                      : isProcessing
                      ? 'bg-gray-300'
                      : 'bg-gradient-to-br from-primary-500 to-secondary-600 hover:scale-105 hover:shadow-2xl'
                  )}
                >
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse-ring" />
                  )}
                  <span className="relative flex items-center justify-center w-full h-full">
                    {isProcessing ? (
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isRecording ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </span>
                </button>

                <div className="mt-6 h-8">
                  {isRecording && (
                    <div className="flex items-center gap-2 text-red-500">
                      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="font-mono text-xl">{formattedDuration}</span>
                    </div>
                  )}
                  {isProcessing && (
                    <p className="text-primary-600 font-medium">Transcription en cours...</p>
                  )}
                  {!isRecording && !isProcessing && (
                    <p className="text-gray-400">Cliquez pour enregistrer</p>
                  )}
                </div>

                {(recordingError || transcriptionError) && (
                  <p className="mt-4 text-red-500 text-sm">
                    {recordingError || transcriptionError}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Résultat */}
          {displayedResult && (
            <Card variant="bordered">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-500" />
                    Transcription
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(displayedResult)}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copié' : 'Copier'}
                    </Button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm leading-relaxed bg-gray-50 rounded-xl p-4">
                  {displayedResult}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Historique */}
        <div>
          <Card variant="bordered" className="h-fit">
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                Historique
              </h3>
              
              {transcriptions.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  Aucune transcription
                </p>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {transcriptions.map((t) => (
                    <div
                      key={t.id}
                      className={cn(
                        'p-3 rounded-xl cursor-pointer transition group',
                        selectedTranscription?.id === t.id
                          ? 'bg-primary-50 border border-primary-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      )}
                      onClick={() => {
                        setSelectedTranscription(t)
                        reset()
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatDateTime(t.created_at)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(t.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {t.structured_text.slice(0, 100)}...
                      </p>
                      <span className="text-xs text-primary-600 font-medium">
                        {CONFIG.modules.find(m => m.id === t.module)?.nom || t.module}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
