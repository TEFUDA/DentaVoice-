'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Mic, History, Settings, CreditCard, LogOut, Menu, X,
  ChevronDown, Zap, User as UserIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { CONFIG } from '@/lib/config'
import { cn } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  name: string
  email: string
  plan: string
  transcriptions_this_month: number
}

interface DashboardShellProps {
  user: User
  profile: Profile | null
  children: React.ReactNode
}

const navigation = [
  { name: 'Nouvelle transcription', href: '/dashboard', icon: Mic },
  { name: 'Historique', href: '/dashboard/history', icon: History },
  { name: 'Abonnement', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardShell({ user, profile, children }: DashboardShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isPro = profile?.plan === 'pro' || profile?.plan === 'trial'
  const transcriptionsUsed = profile?.transcriptions_this_month || 0
  const transcriptionsLimit = isPro ? '∞' : CONFIG.limites.gratuit.transcriptionsParMois

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">{CONFIG.icone}</span>
              <span className="text-lg font-bold gradient-text">{CONFIG.brandName}</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Plan info */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isPro ? 'Plan Pro' : 'Plan Gratuit'}
                </span>
                {isPro && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    Actif
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {transcriptionsUsed} / {transcriptionsLimit} transcriptions ce mois
              </div>
              {!isPro && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                  <div 
                    className="bg-primary-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min((transcriptionsUsed / CONFIG.limites.gratuit.transcriptionsParMois) * 100, 100)}%` }}
                  />
                </div>
              )}
              {!isPro && (
                <Link href="/dashboard/billing">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition">
                    <Zap className="w-4 h-4" />
                    Passer Pro
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1" />

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-primary-600" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {profile?.name || user.email}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{profile?.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link 
                      href="/dashboard/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
