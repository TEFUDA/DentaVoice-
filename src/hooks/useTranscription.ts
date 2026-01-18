'use client'

import { useState, useCallback } from 'react'

interface TranscriptionResult {
  id?: string
  raw_text: string
  structured_text: string
  duration: number
}

interface UseTranscriptionOptions {
  module?: string
  onSuccess?: (result: TranscriptionResult) => void
  onError?: (error: string) => void
}

export function useTranscription(options: UseTranscriptionOptions = {}) {
  const { module = 'consultation', onSuccess, onError } = options
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const transcribe = useCallback(async (audioBlob: Blob, audioDuration: number) => {
    setIsProcessing(true)
    setProgress(10)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('module', module)
      formData.append('duration', audioDuration.toString())

      setProgress(30)

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      setProgress(70)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur de transcription')
      }

      const data = await response.json()
      
      setProgress(100)
      
      const transcriptionResult: TranscriptionResult = {
        id: data.id,
        raw_text: data.raw_text,
        structured_text: data.structured_text,
        duration: audioDuration,
      }
      
      setResult(transcriptionResult)
      
      if (onSuccess) {
        onSuccess(transcriptionResult)
      }

      return transcriptionResult

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      
      if (onError) {
        onError(errorMessage)
      }
      
      return null
      
    } finally {
      setIsProcessing(false)
      setTimeout(() => setProgress(0), 500)
    }
  }, [module, onSuccess, onError])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setProgress(0)
  }, [])

  return {
    transcribe,
    isProcessing,
    progress,
    result,
    error,
    reset,
  }
}
