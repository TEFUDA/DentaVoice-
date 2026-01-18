import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  plan: 'free' | 'pro'
  transcriptions_count: number
  stripe_customer_id?: string
}

interface Transcription {
  id: string
  created_at: string
  audio_duration: number
  raw_text: string
  structured_text: string
  module: string
  patient_name?: string
}

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  
  transcriptions: Transcription[]
  setTranscriptions: (transcriptions: Transcription[]) => void
  addTranscription: (transcription: Transcription) => void
  
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
  
  selectedModule: string
  setSelectedModule: (module: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      transcriptions: [],
      setTranscriptions: (transcriptions) => set({ transcriptions }),
      addTranscription: (transcription) => 
        set((state) => ({ 
          transcriptions: [transcription, ...state.transcriptions] 
        })),
      
      isRecording: false,
      setIsRecording: (isRecording) => set({ isRecording }),
      
      isProcessing: false,
      setIsProcessing: (isProcessing) => set({ isProcessing }),
      
      selectedModule: 'consultation',
      setSelectedModule: (selectedModule) => set({ selectedModule }),
    }),
    {
      name: 'dentavoice-storage',
      partialize: (state) => ({ 
        selectedModule: state.selectedModule 
      }),
    }
  )
)
