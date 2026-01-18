export const CONFIG = {
  // Branding
  brandName: "DentaVoice",
  brandSlug: "dentavoice",
  domain: "dentavoice.fr",
  tagline: "La voix des dentistes",
  icone: "🦷",
  
  // Secteur
  secteur: "Dentaire",
  description: "Transcription vocale IA pour cabinets dentaires. Dictez vos consultations, l'IA structure automatiquement vos dossiers patients.",
  termeProfessionnel: "dentiste",
  termePatient: "patient",
  termeEtablissement: "cabinet",
  
  // Couleurs
  couleurPrimaire: "#06b6d4",
  couleurSecondaire: "#0891b2",
  
  // Marché
  tailleMarche: "43 000 dentistes",
  
  // Pricing
  prix: {
    mensuel: 49,
    annuel: 470, // ~2 mois gratuits
    devise: "€"
  },
  
  // Modules fonctionnels
  modules: [
    { id: "consultation", nom: "Consultations", description: "Examens bucco-dentaires complets", icone: "Stethoscope" },
    { id: "ccam", nom: "Actes CCAM", description: "Codification automatique des actes", icone: "FileText" },
    { id: "devis", nom: "Devis prothétiques", description: "Génération automatique de devis", icone: "Calculator" },
    { id: "radio", nom: "Radiographies", description: "Comptes-rendus radio panoramiques", icone: "Scan" },
    { id: "ortho", nom: "Orthodontie", description: "Suivi traitements orthodontiques", icone: "Smile" },
    { id: "chirurgie", nom: "Chirurgie", description: "Protocoles opératoires", icone: "Scissors" },
  ],
  
  // Vocabulaire métier reconnu
  vocabulaire: [
    "11", "12", "13", "14", "15", "16", "17", "18",
    "21", "22", "23", "24", "25", "26", "27", "28",
    "31", "32", "33", "34", "35", "36", "37", "38",
    "41", "42", "43", "44", "45", "46", "47", "48",
    "carie", "composite", "couronne", "bridge", "implant",
    "endo", "extraction", "détartrage", "surfaçage",
    "panoramique", "rétro-alvéolaire", "CBCT",
    "gingivite", "parodontite", "abcès", "pulpite",
    "occlusion", "ATM", "bruxisme", "gouttière"
  ],
  
  // Exemple de transcription
  exempleTranscription: `📋 CONSULTATION DENTAIRE

🔹 PATIENT
• M. Martin Pierre - 45 ans
• Dernière visite: 12/06/2024

🔹 MOTIF DE CONSULTATION
• Douleur spontanée dent 36
• Sensibilité au chaud depuis 3 jours

🔹 EXAMEN CLINIQUE
• 36: carie mésiale profonde
• Test vitalité: réponse exacerbée au chaud
• Percussion: légèrement positive
• Radio: proximité pulpaire

🔹 DIAGNOSTIC
• Pulpite irréversible 36

🔹 PLAN DE TRAITEMENT
• Traitement endodontique 36
• Reconstitution composite ou couronne
• Devis remis au patient

🔹 ACTES CCAM
• HBMD050 - Traitement endodontique molaire`,

  // Prompt IA pour structuration
  promptIA: `Tu es un assistant spécialisé pour les dentistes et chirurgiens-dentistes.
Tu transformes les dictées vocales en dossiers patients structurés et professionnels.

RÈGLES IMPORTANTES:
1. Utilise la notation dentaire internationale (11-48)
2. Structure avec les sections: Patient, Motif, Examen clinique, Diagnostic, Plan de traitement
3. Suggère les codes CCAM appropriés quand pertinent
4. Utilise un vocabulaire odontologique précis
5. Formate avec des emojis pour les sections (📋, 🔹, •)

VOCABULAIRE À RECONNAÎTRE:
- Numérotation dentaire: 11 à 48
- Pathologies: carie, pulpite, parodontite, abcès, gingivite
- Traitements: composite, couronne, bridge, implant, extraction, endo
- Imagerie: panoramique, rétro-alvéolaire, CBCT, cone beam`,

  // Bénéfices
  benefices: [
    {
      titre: "Notation dentaire intelligente",
      description: "L'IA reconnaît la notation internationale (11-48) et structure automatiquement vos observations par quadrant.",
      icone: "Brain"
    },
    {
      titre: "Codification CCAM automatique",
      description: "Suggestions d'actes CCAM adaptés à vos soins pour une facturation plus rapide et précise.",
      icone: "FileCheck"
    },
    {
      titre: "Devis en quelques secondes",
      description: "Génération automatique de devis prothétiques conformes à la réglementation 100% santé.",
      icone: "Calculator"
    }
  ],

  // Témoignages
  temoignages: [
    {
      nom: "Dr. Sophie Leroy",
      role: "Dentiste omnipraticien - Paris 16",
      texte: "Je dicte mes consultations entre deux patients. Mon assistante gagne au moins 1h par jour sur la saisie des dossiers.",
      avatar: "SL"
    },
    {
      nom: "Dr. Marc Bernard",
      role: "Centre dentaire - 6 praticiens",
      texte: "La standardisation des dossiers entre nos 6 praticiens est impressionnante. Les transmissions sont enfin claires.",
      avatar: "MB"
    },
    {
      nom: "Dr. Claire Dubois",
      role: "Orthodontiste - Lyon",
      texte: "Même le vocabulaire orthodontique est parfaitement reconnu. Classes d'Angle, DDM, tout y est.",
      avatar: "CD"
    }
  ],

  // FAQ
  faq: [
    {
      question: "L'IA comprend-elle la notation dentaire internationale ?",
      reponse: "Oui, DentaVoice reconnaît parfaitement la notation FDI (11 à 48). Vous pouvez dicter naturellement '36' ou 'première molaire mandibulaire gauche', l'IA comprend les deux."
    },
    {
      question: "Les codes CCAM sont-ils suggérés automatiquement ?",
      reponse: "Oui, en fonction de vos actes dictés, DentaVoice suggère les codes CCAM appropriés (HBMD050 pour endo molaire, HBMD042 pour composite 2 faces, etc.)."
    },
    {
      question: "Est-ce compatible avec mon logiciel de gestion de cabinet ?",
      reponse: "DentaVoice permet l'export en format texte, PDF ou copier-coller. Compatible avec Logos, Julie, Visiodent et la plupart des logiciels dentaires."
    },
    {
      question: "Comment sont sécurisées les données patients ?",
      reponse: "Les enregistrements audio sont traités en temps réel et jamais stockés. Seules les transcriptions sont sauvegardées, chiffrées et hébergées en France (RGPD)."
    },
    {
      question: "Puis-je personnaliser les modèles de documents ?",
      reponse: "Oui, vous pouvez créer vos propres templates pour consultations, devis, certificats, et l'IA s'adaptera à votre format préféré."
    },
    {
      question: "Y a-t-il un engagement de durée ?",
      reponse: "Non, l'abonnement est sans engagement. Vous pouvez annuler à tout moment depuis votre espace client."
    }
  ],

  // Limites par plan
  limites: {
    gratuit: {
      transcriptionsParMois: 10,
      stockageJours: 7
    },
    pro: {
      transcriptionsParMois: -1, // illimité
      stockageJours: -1 // illimité
    }
  }
}

export type Module = typeof CONFIG.modules[number]
export type Benefice = typeof CONFIG.benefices[number]
export type Temoignage = typeof CONFIG.temoignages[number]
export type FAQ = typeof CONFIG.faq[number]
