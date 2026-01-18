'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Mic, MicOff, Play, FileText, CheckCircle, Star, ArrowRight, 
  Clock, Shield, Zap, HelpCircle, ChevronDown, Mail, Phone,
  Stethoscope, Calculator, Scan, Smile, Scissors, Brain, FileCheck,
  Menu, X
} from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { Button } from '@/components/ui'

export default function LandingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleDemo = async () => {
    setIsRecording(true)
    setTranscription('')
    
    setTimeout(() => {
      setIsRecording(false)
      setIsProcessing(true)
      
      setTimeout(() => {
        setIsProcessing(false)
        setTranscription(CONFIG.exempleTranscription)
      }, 2000)
    }, 3000)
  }

  const moduleIcons: Record<string, any> = {
    consultation: Stethoscope,
    ccam: FileText,
    devis: Calculator,
    radio: Scan,
    ortho: Smile,
    chirurgie: Scissors,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">{CONFIG.icone}</span>
              <span className="text-xl font-bold gradient-text">{CONFIG.brandName}</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition">Fonctionnalités</a>
              <a href="#tarifs" className="text-gray-600 hover:text-gray-900 transition">Tarifs</a>
              <a href="#temoignages" className="text-gray-600 hover:text-gray-900 transition">Témoignages</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">
                Connexion
              </Link>
              <Link href="/signup">
                <Button size="md">
                  Essai gratuit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="px-4 space-y-4">
              <a href="#fonctionnalites" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Fonctionnalités</a>
              <a href="#tarifs" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Tarifs</a>
              <a href="#temoignages" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>Témoignages</a>
              <a href="#faq" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <hr />
              <Link href="/login" className="block text-gray-600">Connexion</Link>
              <Link href="/signup" className="block">
                <Button className="w-full">Essai gratuit</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>{CONFIG.secteur} • {CONFIG.tailleMarche}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {CONFIG.tagline}
                <span className="block gradient-text mt-2">
                  Gagnez 80% de temps
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {CONFIG.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="xl" className="w-full sm:w-auto">
                    <Play className="w-5 h-5" />
                    Essai gratuit 14 jours
                  </Button>
                </Link>
                <a href="#demo">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Voir la démo
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>RGPD compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span>Sans carte bancaire</span>
                </div>
              </div>
            </div>

            {/* Demo Card */}
            <div id="demo" className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Testez maintenant</h2>
                <p className="text-gray-500">Cliquez sur le micro et dictez</p>
              </div>

              {/* Micro button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleDemo}
                  disabled={isRecording || isProcessing}
                  className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500' 
                      : isProcessing
                      ? 'bg-primary-300'
                      : 'bg-gradient-to-br from-primary-500 to-secondary-600 hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse-ring" />
                  )}
                  <span className="relative flex items-center justify-center w-full h-full">
                    {isRecording ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : isProcessing ? (
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </span>
                </button>
              </div>

              {/* Status */}
              <div className="text-center mb-6 h-6">
                {isRecording && (
                  <p className="text-red-500 font-medium animate-pulse">🔴 Enregistrement en cours...</p>
                )}
                {isProcessing && (
                  <p className="text-primary-600 font-medium">✨ Transcription IA en cours...</p>
                )}
                {!isRecording && !isProcessing && !transcription && (
                  <p className="text-gray-400">Cliquez sur le micro pour commencer</p>
                )}
              </div>

              {/* Result */}
              {transcription && (
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                  <div className="flex items-center gap-2 mb-4 text-primary-700">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold">Transcription structurée</span>
                  </div>
                  <pre className="text-gray-700 whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {transcription}
                  </pre>
                </div>
              )}

              {/* Vocabulaire */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center mb-3">Vocabulaire dentaire reconnu</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {CONFIG.vocabulaire.slice(0, 12).map((mot, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {mot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">80%</div>
              <div className="text-primary-100">Temps gagné</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">43K+</div>
              <div className="text-primary-100">Dentistes en France</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">99%</div>
              <div className="text-primary-100">Précision</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">&lt;3s</div>
              <div className="text-primary-100">Temps de traitement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="fonctionnalites" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tous vos documents en un clic
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dictez naturellement, l'IA structure automatiquement selon vos modèles métier
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.modules.map((module) => {
              const IconComponent = moduleIcons[module.id] || FileText
              return (
                <div
                  key={module.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.nom}</h3>
                  <p className="text-gray-600">{module.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi {CONFIG.brandName} ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CONFIG.benefices.map((benefice, i) => {
              const icons: Record<string, any> = { Brain, FileCheck, Calculator }
              const IconComponent = icons[benefice.icone] || CheckCircle
              return (
                <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefice.titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefice.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Un tarif simple et transparent
            </h2>
            <p className="text-xl text-gray-600">14 jours d'essai gratuit, sans engagement</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gratuit</h3>
                <div className="text-4xl font-bold text-gray-900">0€</div>
                <p className="text-gray-500 mt-2">Pour découvrir</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  '10 transcriptions/mois',
                  'Tous les modules',
                  'Vocabulaire dentaire',
                  'Export texte',
                  'Historique 7 jours',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full" size="lg">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                Populaire
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-5xl font-bold">{CONFIG.prix.mensuel}€</div>
                <p className="text-primary-100 mt-2">par mois / utilisateur</p>
                <p className="text-sm text-primary-200 mt-1">
                  ou {CONFIG.prix.annuel}€/an (2 mois offerts)
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Transcriptions illimitées',
                  'Tous les modules',
                  'Vocabulaire dentaire complet',
                  'Export PDF, Word, copier-coller',
                  'Historique illimité',
                  'Codes CCAM suggérés',
                  'Support prioritaire',
                  'API disponible',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=pro">
                <Button className="w-full bg-white text-primary-600 hover:bg-gray-100" size="lg">
                  Essai gratuit 14 jours
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <p className="text-center text-sm text-primary-100 mt-4">Sans carte bancaire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CONFIG.temoignages.map((temoignage, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{temoignage.texte}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold">
                    {temoignage.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{temoignage.nom}</p>
                    <p className="text-sm text-gray-500">{temoignage.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {CONFIG.faq.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 pl-8">{item.reponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à révolutionner votre cabinet ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez les dentistes qui ont déjà adopté {CONFIG.brandName}
          </p>
          <Link href="/signup">
            <Button className="bg-white text-primary-600 hover:bg-gray-100" size="xl">
              <Play className="w-5 h-5" />
              Démarrer l'essai gratuit
            </Button>
          </Link>
          <p className="text-sm text-primary-200 mt-4">
            14 jours gratuits • Sans carte bancaire • Sans engagement
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{CONFIG.icone}</span>
                <span className="text-xl font-bold text-white">{CONFIG.brandName}</span>
              </div>
              <p className="text-sm leading-relaxed">{CONFIG.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#fonctionnalites" className="hover:text-white transition">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-white transition">Tarifs</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-white transition">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white transition">Confidentialité</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition">CGV</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@{CONFIG.domain}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  01 23 45 67 89
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 {CONFIG.brandName} - Une solution Modernee</p>
            <div className="flex items-center gap-4">
              <span className="text-sm">Hébergé en France 🇫🇷</span>
              <span className="text-sm">Conforme RGPD ✓</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
