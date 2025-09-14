"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Search,
  Zap,
  Database,
  Lock,
  Eye,
  Copy,
  ExternalLink,
  Activity,
  Cpu,
  HardDrive,
  Network,
} from "lucide-react"
import Link from "next/link"

// Mock blockchain data
const networkStats = {
  totalBlocks: 2847291,
  totalTransactions: 1429847,
  activeNodes: 156,
  networkHashRate: "2.4 TH/s",
  blockTime: "12.3s",
  gasPrice: "0.000000021 ETH",
  tps: 847,
  uptime: 99.97,
}

const recentBlocks = [
  {
    number: 2847291,
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: "Il y a 12 secondes",
    transactions: 247,
    miner: "TerraTrust Node #12",
    gasUsed: "12,847,291",
    reward: "2.5 TTT",
  },
  {
    number: 2847290,
    hash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    timestamp: "Il y a 24 secondes",
    transactions: 189,
    miner: "TerraTrust Node #7",
    gasUsed: "9,234,567",
    reward: "2.5 TTT",
  },
  {
    number: 2847289,
    hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    timestamp: "Il y a 36 secondes",
    transactions: 312,
    miner: "TerraTrust Node #23",
    gasUsed: "15,678,901",
    reward: "2.5 TTT",
  },
]

const recentTransactions = [
  {
    hash: "0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123",
    type: "Land Transfer",
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    to: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    value: "1 NFT",
    fee: "0.0021 TTT",
    status: "confirmed",
    timestamp: "Il y a 2 min",
  },
  {
    hash: "0xdef456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123ghi456",
    type: "Land Registration",
    from: "0x0000000000000000000000000000000000000000",
    to: "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C05",
    value: "1 NFT",
    fee: "0.0035 TTT",
    status: "confirmed",
    timestamp: "Il y a 5 min",
  },
  {
    hash: "0xghi789jkl012mno345pqr678stu901vwx234yz567abc890def123ghi456jkl789",
    type: "Ownership Verification",
    from: "0x532925a3b8D4C0532925a3b8D4C0532925a3b8D4C",
    to: "0x532925a3b8D4C0532925a3b8D4C0532925a3b8D4C",
    value: "0 TTT",
    fee: "0.0008 TTT",
    status: "pending",
    timestamp: "Il y a 8 min",
  },
]

const landNFTs = [
  {
    tokenId: "TT-NFT-001",
    name: "Bohicon Parcelle 127/A",
    owner: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    location: "Bohicon, Bénin",
    area: "2,500 m²",
    mintDate: "2024-01-15",
    lastTransfer: "2024-01-15",
    verified: true,
    metadata: {
      coordinates: "14.6937°N, 17.4441°W",
      landUse: "Résidentiel",
      zoning: "R2",
    },
  },
  {
    tokenId: "TT-NFT-002",
    name: "Ouaga Zone 4C",
    owner: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    location: "Ouagadougou, Burkina-Faso",
    area: "1,800 m²",
    mintDate: "2024-01-14",
    lastTransfer: "2024-01-14",
    verified: true,
    metadata: {
      coordinates: "5.3600°N, 4.0083°W",
      landUse: "Commercial",
      zoning: "C1",
    },
  },
]

export default function BlockchainPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const truncateHash = (hash: string, start = 6, end = 4) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">Confirmé</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "failed":
        return <Badge variant="destructive">Échoué</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">TerraTrust</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Registre Foncier
              </Link>
              <Link href="/conflicts" className="text-muted-foreground hover:text-foreground transition-colors">
                Analyse des Conflits
              </Link>
              <Link href="/portal" className="text-muted-foreground hover:text-foreground transition-colors">
                Portail Citoyen
              </Link>
              <Link href="/blockchain" className="text-primary font-medium">
                Blockchain
              </Link>
              <Button variant="outline" size="sm">
                Profil
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explorateur Blockchain TerraTrust</h1>
          <p className="text-muted-foreground">
            Transparence totale et sécurité cryptographique pour les données foncières
          </p>
        </div>

        {/* Network Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocs Totaux</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkStats.totalBlocks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+1 toutes les {networkStats.blockTime}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkStats.totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{networkStats.tps} TPS actuellement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nœuds Actifs</CardTitle>
              <Network className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkStats.activeNodes}</div>
              <p className="text-xs text-muted-foreground">Réseau décentralisé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibilité</CardTitle>
              <Zap className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkStats.uptime}%</div>
              <p className="text-xs text-muted-foreground">Temps de fonctionnement</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Explorateur Blockchain
            </CardTitle>
            <CardDescription>Recherchez des transactions, blocs, adresses ou NFT fonciers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Hash de transaction, numéro de bloc, adresse ou ID NFT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="blocks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blocks">Blocs Récents</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="nfts">NFT Fonciers</TabsTrigger>
            <TabsTrigger value="network">Réseau</TabsTrigger>
          </TabsList>

          <TabsContent value="blocks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Blocs Récents
                </CardTitle>
                <CardDescription>Derniers blocs minés sur le réseau TerraTrust</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBlocks.map((block) => (
                    <div
                      key={block.number}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Bloc #{block.number}</h3>
                            <Badge variant="outline">{block.transactions} transactions</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{block.timestamp}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Hash:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{truncateHash(block.hash, 8, 8)}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(block.hash)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Mineur:</span>
                          <div className="text-muted-foreground">{block.miner}</div>
                        </div>
                        <div>
                          <span className="font-medium">Gas utilisé:</span>
                          <div className="text-muted-foreground">{block.gasUsed}</div>
                        </div>
                        <div>
                          <span className="font-medium">Récompense:</span>
                          <div className="text-muted-foreground">{block.reward}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-chart-1" />
                  Transactions Récentes
                </CardTitle>
                <CardDescription>Dernières transactions foncières sur la blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.hash}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{tx.type}</h3>
                            {getStatusBadge(tx.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Détails
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-sm">Hash de transaction:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{truncateHash(tx.hash, 10, 10)}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(tx.hash)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">De:</span>
                            <div className="text-muted-foreground font-mono text-xs">{truncateHash(tx.from)}</div>
                          </div>
                          <div>
                            <span className="font-medium">Vers:</span>
                            <div className="text-muted-foreground font-mono text-xs">{truncateHash(tx.to)}</div>
                          </div>
                          <div>
                            <span className="font-medium">Valeur:</span>
                            <div className="text-muted-foreground">{tx.value}</div>
                          </div>
                          <div>
                            <span className="font-medium">Frais:</span>
                            <div className="text-muted-foreground">{tx.fee}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  NFT Fonciers
                </CardTitle>
                <CardDescription>Tokens non-fongibles représentant les parcelles de terrain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {landNFTs.map((nft) => (
                    <div key={nft.tokenId} className="border border-border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground">{nft.location}</p>
                          <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                            <Lock className="w-3 h-3 mr-1" />
                            Vérifié
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir NFT
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Token ID:</span>
                            <div className="text-muted-foreground">{nft.tokenId}</div>
                          </div>
                          <div>
                            <span className="font-medium">Superficie:</span>
                            <div className="text-muted-foreground">{nft.area}</div>
                          </div>
                          <div>
                            <span className="font-medium">Créé le:</span>
                            <div className="text-muted-foreground">{nft.mintDate}</div>
                          </div>
                          <div>
                            <span className="font-medium">Dernier transfert:</span>
                            <div className="text-muted-foreground">{nft.lastTransfer}</div>
                          </div>
                        </div>

                        <div>
                          <span className="font-medium text-sm">Propriétaire actuel:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{truncateHash(nft.owner)}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(nft.owner)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="font-medium text-sm">Métadonnées:</span>
                          <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                            <div>
                              <span className="font-medium">Coordonnées:</span> {nft.metadata.coordinates}
                            </div>
                            <div>
                              <span className="font-medium">Usage:</span> {nft.metadata.landUse}
                            </div>
                            <div>
                              <span className="font-medium">Zonage:</span> {nft.metadata.zoning}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Performance Réseau
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taux de hachage</span>
                      <span>{networkStats.networkHashRate}</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transactions par seconde</span>
                      <span>{networkStats.tps} TPS</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Temps de bloc moyen</span>
                      <span>{networkStats.blockTime}</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-chart-2" />
                    Statistiques Blockchain
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{networkStats.totalBlocks.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Blocs totaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-1">
                      {networkStats.totalTransactions.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Transactions totales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{networkStats.activeNodes}</div>
                    <div className="text-sm text-muted-foreground">Nœuds actifs</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité et Consensus</CardTitle>
                <CardDescription>Mécanismes de sécurité et de consensus du réseau TerraTrust</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Algorithme de Consensus
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> Proof of Authority (PoA)
                      </div>
                      <div>
                        <span className="font-medium">Validateurs:</span> 21 nœuds autorisés
                      </div>
                      <div>
                        <span className="font-medium">Finalité:</span> 2 confirmations
                      </div>
                      <div>
                        <span className="font-medium">Temps de bloc:</span> 12 secondes
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-accent" />
                      Sécurité Cryptographique
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Chiffrement:</span> SHA-256
                      </div>
                      <div>
                        <span className="font-medium">Signatures:</span> ECDSA secp256k1
                      </div>
                      <div>
                        <span className="font-medium">Merkle Tree:</span> Activé
                      </div>
                      <div>
                        <span className="font-medium">Immutabilité:</span> Garantie
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
