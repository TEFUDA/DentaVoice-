import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CONFIG } from '@/lib/config'

export const metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">{CONFIG.icone} Mentions Légales</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Éditeur du site</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Modernee SASU</strong><br />
              Société par Actions Simplifiée Unipersonnelle<br />
              Capital social : 1 000 €<br />
              SIRET : XXX XXX XXX XXXXX<br />
              RCS Amiens : XXX XXX XXX<br />
              Siège social : Amiens, France<br />
              Email : contact@{CONFIG.domain}<br />
              Directeur de la publication : Loïc Gros-Flandre
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, USA<br />
              <br />
              <strong>Base de données :</strong><br />
              Supabase Inc. - Hébergement AWS eu-west (Irlande/France)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Données personnelles</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.<br /><br />
              Pour exercer ces droits : contact@{CONFIG.domain}<br /><br />
              Voir notre <Link href="/confidentialite" className="text-primary-600 hover:underline">Politique de confidentialité</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Ce site utilise des cookies strictement nécessaires au fonctionnement du service (authentification, session). Aucun cookie publicitaire ou de tracking n'est utilisé.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
