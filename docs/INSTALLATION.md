# Guide d'Installation TerraTrust

## Prérequis

- Node.js 18+ 
- PostgreSQL 14+
- Git
- Docker (optionnel)

## Installation Locale

### 1. Cloner le Repository
\`\`\`bash
git clone https://github.com/votre-org/terratrust.git
cd terratrust
\`\`\`

### 2. Installer les Dépendances
\`\`\`bash
npm install
\`\`\`

### 3. Configuration Base de Données
\`\`\`bash
# Créer la base de données
createdb terratrust

# Configurer les variables d'environnement
cp .env.example .env.local
\`\`\`

### 4. Variables d'Environnement
\`\`\`env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/terratrust"

# Authentification
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Blockchain
ETHEREUM_RPC_URL="your-ethereum-rpc"
PRIVATE_KEY="your-private-key"

# IA
OPENAI_API_KEY="your-openai-key"

# Cartographie
MAPBOX_TOKEN="your-mapbox-token"
\`\`\`

### 5. Migration Base de Données
\`\`\`bash
npx prisma migrate dev
npx prisma db seed
\`\`\`

### 6. Lancer l'Application
\`\`\`bash
npm run dev
\`\`\`

L'application sera disponible sur `http://localhost:3000`

## Déploiement Production

### Vercel (Recommandé)
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t terratrust .
docker run -p 3000:3000 terratrust
\`\`\`

## Dépannage

### Problèmes Courants
- **Port 3000 occupé** : Utiliser `npm run dev -- -p 3001`
- **Erreur base de données** : Vérifier la connexion PostgreSQL
- **Erreur blockchain** : Vérifier les clés API Ethereum
