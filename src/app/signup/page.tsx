'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button, Input } from '@/components/ui'
import { CONFIG } from '@/lib/config'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'free'
  const supabase = createClient()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, plan: plan === 'pro' ? 'trial' : 'free' },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message.includes('already registered') ? 'Cet email est déjà utilisé' : error.message)
        return
      }

      if (data.user && !data.session) {
        setSuccess(true)
      } else if (data.session) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vérifiez votre email</h1>
            <p className="text-gray-600 mb-6">
              Nous avons envoyé un lien de confirmation à <strong>{email}</strong>.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-4xl">{CONFIG.icone}</span>
            <span className="text-2xl font-bold gradient-text">{CONFIG.brandName}</span>
          </Link>
          <p className="text-gray-600 mt-2">{plan === 'pro' ? 'Essai Pro gratuit 14 jours' : 'Créez votre compte gratuit'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} className="pl-12" required />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="email" placeholder="Email professionnel" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-12" required />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe (8 car. min)" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-12 pr-12" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-xs text-gray-500">
              En créant un compte, vous acceptez nos <Link href="/cgv" className="text-primary-600 hover:underline">CGV</Link> et notre <Link href="/confidentialite" className="text-primary-600 hover:underline">politique de confidentialité</Link>.
            </p>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Créer mon compte <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Déjà un compte ? <Link href="/login" className="text-primary-600 font-medium hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}
