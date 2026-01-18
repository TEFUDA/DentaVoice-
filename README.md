# 🦷 DentaVoice - Production Ready

**Transcription vocale IA pour cabinets dentaires**

Dictez vos consultations, l'IA structure automatiquement vos dossiers patients avec reconnaissance du vocabulaire dentaire (notation 11-48, CCAM, etc.).

## 🚀 Déploiement en 15 minutes

### Prérequis
- Compte [Vercel](https://vercel.com) (gratuit)
- Compte [Supabase](https://supabase.com) (gratuit)
- Clé API [Groq](https://console.groq.com) (gratuit)
- Compte [Stripe](https://stripe.com) (pour les paiements)

### Étape 1: Supabase

1. Créez un nouveau projet sur [supabase.com](https://supabase.com)
2. Allez dans **SQL Editor** et exécutez le contenu de `supabase-schema.sql`
3. Allez dans **Authentication > Providers** et activez:
   - Email (activé par défaut)
   - Google (optionnel mais recommandé)
4. Récupérez vos clés dans **Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Étape 2: Groq

1. Créez un compte sur [console.groq.com](https://console.groq.com)
2. Générez une API key
3. Notez votre `GROQ_API_KEY`

### Étape 3: Stripe

1. Créez un compte sur [stripe.com](https://stripe.com)
2. Créez deux produits dans **Products**:
   - **DentaVoice Pro Mensuel**: 49€/mois
   - **DentaVoice Pro Annuel**: 470€/an
3. Notez les `price_id` de chaque produit
4. Récupérez vos clés dans **Developers > API keys**:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Créez un webhook dans **Developers > Webhooks**:
   - URL: `https://votre-domaine.com/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`
   - Notez le `STRIPE_WEBHOOK_SECRET`

### Étape 4: Déploiement Vercel

1. Forkez ce repo sur GitHub
2. Connectez-vous à [Vercel](https://vercel.com)
3. Importez le repo
4. Ajoutez les variables d'environnement:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
GROQ_API_KEY=gsk_xxx
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_MONTHLY=price_xxx
STRIPE_PRICE_YEARLY=price_xxx
NEXT_PUBLIC_APP_URL=https://dentavoice.fr
```

5. Déployez !

### Étape 5: Domaine personnalisé

1. Dans Vercel, allez dans **Settings > Domains**
2. Ajoutez `dentavoice.fr`
3. Configurez les DNS chez votre registrar

## 📁 Structure du projet

```
dentavoice-prod/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── transcribe/     # API transcription
│   │   │   ├── checkout/       # Stripe checkout
│   │   │   ├── webhook/        # Stripe webhooks
│   │   │   └── user/           # Profil utilisateur
│   │   ├── dashboard/          # App principale
│   │   ├── login/              # Connexion
│   │   ├── signup/             # Inscription
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # Composants réutilisables
│   │   └── dashboard/          # Composants dashboard
│   ├── hooks/
│   │   ├── useAudioRecorder.ts # Hook enregistrement audio
│   │   └── useTranscription.ts # Hook transcription
│   └── lib/
│       ├── config.ts           # Configuration
│       ├── supabase/           # Clients Supabase
│       ├── stripe.ts           # Client Stripe
│       ├── store.ts            # État global (Zustand)
│       └── utils.ts            # Utilitaires
├── supabase-schema.sql         # Schema base de données
└── .env.example                # Variables d'environnement
```

## 🔧 Développement local

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer le serveur de développement
npm run dev
```

## ✨ Fonctionnalités

- ✅ **Authentification** - Email + Google OAuth
- ✅ **Transcription vocale** - Groq Whisper (précision 99%)
- ✅ **Structuration IA** - LLaMA 3.1 70B
- ✅ **Vocabulaire dentaire** - Notation 11-48, CCAM, pathologies
- ✅ **Dashboard** - Historique, modules, export
- ✅ **Paiements** - Stripe avec essai 14 jours
- ✅ **Plans** - Gratuit (10/mois) et Pro (illimité)
- ✅ **RGPD** - Données hébergées en France

## 📊 Modules disponibles

| Module | Description |
|--------|-------------|
| Consultations | Examens bucco-dentaires complets |
| Actes CCAM | Codification automatique |
| Devis | Génération devis prothétiques |
| Radiographies | Comptes-rendus panoramiques |
| Orthodontie | Suivi traitements |
| Chirurgie | Protocoles opératoires |

## 🔐 Sécurité

- Audio traité en temps réel, jamais stocké
- Transcriptions chiffrées
- Hébergement Supabase (AWS eu-west)
- RLS (Row Level Security) activé
- HTTPS obligatoire

## 📈 Personnalisation

Pour adapter à une autre verticale, modifiez `src/lib/config.ts`:

```typescript
export const CONFIG = {
  brandName: "VotreMarque",
  secteur: "Votre secteur",
  modules: [...],
  vocabulaire: [...],
  promptIA: "...",
  // ...
}
```

## 🆘 Support

- Email: contact@dentavoice.fr
- Documentation: https://docs.dentavoice.fr

---

**Développé par [Modernee](https://modernee.fr)** • Licence propriétaire
