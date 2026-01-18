import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CONFIG } from '@/lib/config'

export const metadata = {
  title: 'Conditions Générales de Vente',
}

export default function CGV() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">{CONFIG.icone} Conditions Générales de Vente</h1>
          <p className="text-gray-500 mb-8">Dernière mise à jour : Janvier 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 1 - Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent la fourniture du service {CONFIG.brandName}, un logiciel de transcription vocale assistée par intelligence artificielle, édité par Modernee SASU.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 2 - Description du service</h2>
            <p className="text-gray-600 leading-relaxed">
              {CONFIG.brandName} permet aux professionnels de santé dentaire de transcrire et structurer automatiquement leurs dictées vocales en documents professionnels. Le service comprend :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Transcription vocale en temps réel</li>
              <li>Structuration automatique par IA</li>
              <li>Reconnaissance du vocabulaire dentaire</li>
              <li>Historique des transcriptions</li>
              <li>Export des documents</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 3 - Tarifs</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Plan Gratuit :</strong> 0€ - Limité à {CONFIG.limites.gratuit.transcriptionsParMois} transcriptions par mois<br /><br />
              <strong>Plan Pro :</strong> {CONFIG.prix.mensuel}€/mois ou {CONFIG.prix.annuel}€/an - Transcriptions illimitées<br /><br />
              Les prix sont indiqués en euros TTC. TVA non applicable (article 293 B du CGI).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 4 - Période d'essai</h2>
            <p className="text-gray-600 leading-relaxed">
              L'abonnement Pro bénéficie d'une période d'essai gratuite de 14 jours. Pendant cette période, vous pouvez annuler à tout moment sans être facturé. À l'issue de la période d'essai, l'abonnement est automatiquement activé et facturé selon la périodicité choisie.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 5 - Paiement</h2>
            <p className="text-gray-600 leading-relaxed">
              Le paiement s'effectue par carte bancaire via notre partenaire Stripe. L'abonnement est renouvelé automatiquement à chaque échéance (mensuelle ou annuelle). Le prélèvement intervient à la date anniversaire de souscription.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 6 - Résiliation</h2>
            <p className="text-gray-600 leading-relaxed">
              L'abonnement est sans engagement. Vous pouvez résilier à tout moment depuis votre espace client. La résiliation prend effet à la fin de la période en cours. Aucun remboursement prorata temporis n'est effectué.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 7 - Droit de rétractation</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni sur un support matériel dont l'exécution a commencé avec l'accord préalable du consommateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 8 - Responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              {CONFIG.brandName} est un outil d'aide à la rédaction. Les transcriptions générées doivent être vérifiées par l'utilisateur avant utilisation. L'éditeur ne saurait être tenu responsable des erreurs de transcription ou des conséquences de l'utilisation du service. La responsabilité de l'éditeur est limitée au montant de l'abonnement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 9 - Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              Le service {CONFIG.brandName}, son interface, son code et ses contenus sont la propriété exclusive de Modernee SASU. L'utilisateur conserve la propriété de ses transcriptions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 10 - Données personnelles</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement des données personnelles est détaillé dans notre <Link href="/confidentialite" className="text-primary-600 hover:underline">Politique de confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Article 11 - Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents d'Amiens.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Article 12 - Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Modernee SASU</strong><br />
              Email : contact@{CONFIG.domain}<br />
              Service client : support@{CONFIG.domain}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
