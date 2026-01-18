'use client'

import { useState, useRef, useCallback } from 'react'

interface UseAudioRecorderOptions {
  onRecordingComplete?: (blob: Blob, duration: number) => void
  maxDuration?: number // en secondes
}

export function useAudioRecorder(options: UseAudioRecorderOptions = {}) {
  const { onRecordingComplete, maxDuration = 300 } = options
  
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const startRecording = useCallback(async () => {
    try {
      setError(null)
      chunksRef.current = []
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      })
      
      // Préférer webm/opus, sinon mp4, sinon ce qui est disponible
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/webm'
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000)
        
        // Arrêter toutes les pistes audio
        stream.getTracks().forEach(track => track.stop())
        
        if (onRecordingComplete) {
          onRecordingComplete(blob, finalDuration)
        }
      }
      
      mediaRecorder.start(1000) // Chunk toutes les secondes
      startTimeRef.current = Date.now()
      setIsRecording(true)
      setIsPaused(false)
      setDuration(0)
      
      // Timer pour la durée
      timerRef.current = setInterval(() => {
        setDuration(d => {
          const newDuration = d + 1
          if (newDuration >= maxDuration) {
            stopRecording()
          }
          return newDuration
        })
      }, 1000)
      
    } catch (err) {
      console.error('Erreur démarrage enregistrement:', err)
      setError("Impossible d'accéder au microphone. Vérifiez les permissions.")
    }
  }, [maxDuration, onRecordingComplete])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    setIsRecording(false)
    setIsPaused(false)
  }, [])

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      timerRef.current = setInterval(() => {
        setDuration(d => {
          const newDuration = d + 1
          if (newDuration >= maxDuration) {
            stopRecording()
          }
          return newDuration
        })
      }, 1000)
    }
  }, [maxDuration, stopRecording])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    isRecording,
    isPaused,
    duration,
    formattedDuration: formatDuration(duration),
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  }
}
