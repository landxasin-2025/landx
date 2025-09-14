# Documentation API TerraTrust

## Authentification

Toutes les routes API nécessitent une authentification via JWT token.

\`\`\`http
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Authentification
\`\`\`http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
\`\`\`

### Gestion des Parcelles
\`\`\`http
GET    /api/lands              # Liste des parcelles
POST   /api/lands              # Créer une parcelle
GET    /api/lands/:id          # Détails d'une parcelle
PUT    /api/lands/:id          # Modifier une parcelle
DELETE /api/lands/:id          # Supprimer une parcelle
\`\`\`

### Blockchain
\`\`\`http
GET  /api/blockchain/status    # Statut du réseau
POST /api/blockchain/mint      # Créer un NFT parcelle
GET  /api/blockchain/verify    # Vérifier une transaction
\`\`\`

### Prédiction de Conflits
\`\`\`http
GET  /api/conflicts/predict    # Prédictions IA
POST /api/conflicts/report     # Signaler un conflit
GET  /api/conflicts/history    # Historique des conflits
\`\`\`

### Géoréférencement
\`\`\`http
POST /api/geo/upload           # Upload image drone/satellite
GET  /api/geo/boundaries       # Limites géographiques
POST /api/geo/analyze          # Analyse IA des images
\`\`\`

## Exemples de Requêtes

### Créer une Parcelle
\`\`\`javascript
const response = await fetch('/api/lands', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "Parcelle Agricole",
    coordinates: [14.6928, -17.4467],
    area: 5000,
    owner: "Jean Dupont"
  })
});
\`\`\`

### Vérifier sur Blockchain
\`\`\`javascript
const verification = await fetch(`/api/blockchain/verify/${landId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
