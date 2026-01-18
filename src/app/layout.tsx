import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CONFIG } from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${CONFIG.brandName} - ${CONFIG.tagline}`,
    template: `%s | ${CONFIG.brandName}`,
  },
  description: CONFIG.description,
  keywords: [
    'transcription vocale dentiste',
    'dictée vocale cabinet dentaire',
    'IA dentiste',
    'logiciel dentaire',
    'dossier patient dentaire',
    'CCAM dentaire',
    'reconnaissance vocale dentaire',
    CONFIG.brandName,
  ],
  authors: [{ name: 'Modernee' }],
  creator: 'Modernee',
  publisher: 'Modernee',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: `https://${CONFIG.domain}`,
    siteName: CONFIG.brandName,
    title: `${CONFIG.brandName} - ${CONFIG.tagline}`,
    description: CONFIG.description,
    images: [
      {
        url: `https://${CONFIG.domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: CONFIG.brandName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CONFIG.brandName} - ${CONFIG.tagline}`,
    description: CONFIG.description,
    images: [`https://${CONFIG.domain}/og-image.png`],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: CONFIG.couleurPrimaire,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
