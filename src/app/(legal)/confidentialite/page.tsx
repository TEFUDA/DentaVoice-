import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CONFIG } from '@/lib/config'

export const metadata = {
  title: 'Politique de confidentialité',
}

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">{CONFIG.icone} Politique de Confidentialité</h1>
          <p className="text-gray-500 mb-8">Dernière mise à jour : Janvier 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous collectons uniquement les données nécessaires au fonctionnement du service :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Données de compte :</strong> email, nom (facultatif)</li>
              <li><strong>Données d'usage :</strong> transcriptions, historique</li>
              <li><strong>Données de paiement :</strong> traitées par Stripe (nous ne stockons pas vos coordonnées bancaires)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Traitement des enregistrements audio</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Important :</strong> Les enregistrements audio sont traités en temps réel et <strong>ne sont jamais stockés</strong> sur nos serveurs. L'audio est envoyé directement à l'API de transcription (Groq), transcrit, puis immédiatement supprimé. Seul le texte transcrit est conservé dans votre historique.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Utilisation des données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fournir le service de transcription</li>
              <li>Gérer votre compte et abonnement</li>
              <li>Améliorer nos services (données anonymisées)</li>
              <li>Vous contacter en cas de besoin (support, facturation)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Partage des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous ne vendons jamais vos données. Elles sont partagées uniquement avec nos sous-traitants techniques :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li><strong>Supabase :</strong> hébergement base de données (EU)</li>
              <li><strong>Groq :</strong> transcription audio (API)</li>
              <li><strong>Stripe :</strong> paiements</li>
              <li><strong>Vercel :</strong> hébergement application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Sécurité</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité appropriées :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Chiffrement en transit (HTTPS/TLS)</li>
              <li>Chiffrement au repos (AES-256)</li>
              <li>Authentification sécurisée (tokens JWT)</li>
              <li>Accès restreint aux données (RLS)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Conservation</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Plan gratuit :</strong> historique conservé 7 jours<br />
              <strong>Plan Pro :</strong> historique conservé sans limite<br /><br />
              En cas de suppression de compte, toutes vos données sont supprimées sous 30 jours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Vos droits (RGPD)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Rectification :</strong> corriger vos informations</li>
              <li><strong>Suppression :</strong> supprimer votre compte et données</li>
              <li><strong>Portabilité :</strong> exporter vos données</li>
              <li><strong>Opposition :</strong> refuser certains traitements</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Pour exercer ces droits : <a href={`mailto:contact@${CONFIG.domain}`} className="text-primary-600 hover:underline">contact@{CONFIG.domain}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative à cette politique :<br /><br />
              <strong>Modernee SASU</strong><br />
              Email : contact@{CONFIG.domain}<br />
              Délégué à la protection des données : dpo@modernee.fr
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
