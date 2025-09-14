# TerraTrust - Plateforme de Gouvernance Foncière Intelligente

## 🌍 Vision
TerraTrust révolutionne la gestion foncière en Afrique en combinant blockchain, intelligence artificielle et géoréférencement pour créer un registre foncier inviolable, transparent et sécurisé.

## 🚀 Fonctionnalités Principales

- **🔐 Registre Blockchain** : Chaque parcelle devient un NFT unique et infalsifiable
- **🛰️ Géoréférencement IA** : Cartographie précise par drones et satellites
- **🧠 Prédiction de Conflits** : Analyse prédictive pour prévenir les disputes
- **💬 Assistant Virtuel** : Chatbot intelligent pour les citoyens

## 📁 Structure du Projet

\`\`\`
terratrust/
├── Frontend/            Interface utilisateur Next.js
│   ├── app/            Pages App Router
│   ├── components/     Composants réutilisables
│   ├── hooks/          Hooks React personnalisés
│   ├── lib/            Utilitaires frontend
│   └── styles/         Système de design
├── Backend/            Logique métier et API
│   ├── api/           Routes API Express
│   ├── services/      Services (auth, blockchain, IA)
│   ├── models/        Modèles de données
│   ├── types/         Définitions TypeScript
│   └── middleware/    Middleware de sécurité
├── Docs/              Documentation complète
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   └── API.md
├── Tests/            # Tests automatisés
│   ├── frontend/     # Tests composants React
│   ├── backend/      # Tests services Node.js
│   └── e2e/          # Tests end-to-end Cypress
└── Assets/           # Ressources statiques
    ├── images/       # Images et illustrations
    └── icons/        # Icônes et logos
\`\`\`

## 🛠️ Installation Rapide

### Frontend (Next.js)
\`\`\`bash
cd Frontend
npm install
npm run dev
\`\`\`

### Backend (Express)
\`\`\`bash
cd Backend
npm install
npm run dev
\`\`\`

## 📚 Documentation

- [Guide d'Installation](Docs/INSTALLATION.md)
- [Architecture Technique](Docs/ARCHITECTURE.md)
- [Documentation API](Docs/API.md)

## 🧪 Tests

\`\`\`bash
# Tests Frontend
cd Frontend && npm run test

# Tests Backend
cd Backend && npm run test

# Tests E2E
cd Tests && npm run test:e2e
\`\`\`

## 🚀 Déploiement

### Vercel (Frontend)
\`\`\`bash
cd Frontend
npm install -g vercel
vercel --prod
\`\`\`

### Backend (Docker)
\`\`\`bash
cd Backend
docker build -t terratrust-backend .
docker run -p 8000:8000 terratrust-backend
\`\`\`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- 📧 Email: landxasin@gmail.com
- 🌐 Site web: https://projet-landx.netlify.app/
- 📱 Téléphone: +229 01 62 60 30 18

---

**Développé avec ❤️ par LandX Group pour l'Afrique**
