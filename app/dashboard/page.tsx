"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Shield,
  Search,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  LogOut,
  Settings,
  User,
  Bell,
  Plus,
  Filter,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useAuth, AuthGuard } from "@/components/auth-guard"

// Mock data for land parcels
const landParcels = [
  {
    id: "TT-001-2024",
    nftId: "0x1a2b3c4d5e6f",
    location: "Porto-novo, Parcelle 127/A",
    owner: "Amadou Bouragui",
    area: "2,500 m²",
    status: "verified",
    lastUpdate: "2024-01-15",
    value: "45,000,000 FCFA",
    transactions: 3,
  },
  {
    id: "TT-002-2024",
    nftId: "0x2b3c4d5e6f7a",
    location: "Lokossa, Zone 4C",
    owner: "Marie Zinsou",
    area: "1,800 m²",
    status: "pending",
    lastUpdate: "2024-01-14",
    value: "32,000,000 FCFA",
    transactions: 1,
  },
  {
    id: "TT-003-2024",
    nftId: "0x3c4d5e6f7a8b",
    location: "Dassa, Victoria Kenneth",
    owner: "Chukwu Okafor",
    area: "3,200 m²",
    status: "verified",
    lastUpdate: "2024-01-13",
    value: "125,000,000 NGN",
    transactions: 7,
  },
  {
    id: "TT-004-2024",
    nftId: "0x4d5e6f7a8b9c",
    location: "Malanville, East Legon",
    owner: "Kwame Asante",
    area: "2,100 m²",
    status: "dispute",
    lastUpdate: "2024-01-12",
    value: "180,000 GHS",
    transactions: 2,
  },
]

const recentTransactions = [
  {
    id: "TX-001",
    type: "transfer",
    parcel: "TT-001-2024",
    from: "Fatou Sow",
    to: "Amadou Diallo",
    date: "2024-01-15 14:30",
    hash: "0xabc123def456",
  },
  {
    id: "TX-002",
    type: "registration",
    parcel: "TT-002-2024",
    from: "État de Bénin",
    to: "Marie Kouassi",
    date: "2024-01-14 09:15",
    hash: "0xdef456ghi789",
  },
  {
    id: "TX-003",
    type: "verification",
    parcel: "TT-003-2024",
    from: "System",
    to: "Chukwu Okafor",
    date: "2024-01-13 16:45",
    hash: "0xghi789jkl012",
  },
]

function DashboardContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const filteredParcels = landParcels.filter((parcel) => {
    const matchesSearch =
      parcel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || parcel.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Vérifié
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "dispute":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Litige
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "transfer":
        return <Users className="w-4 h-4 text-primary" />
      case "registration":
        return <Shield className="w-4 h-4 text-chart-1" />
      case "verification":
        return <CheckCircle className="w-4 h-4 text-accent" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-primary font-medium border-b-2 border-primary pb-1">
                Registre Foncier
              </Link>
              <Link href="/conflicts" className="text-muted-foreground hover:text-foreground transition-colors">
                Analyse des Conflits
              </Link>
              <Link href="/portal" className="text-muted-foreground hover:text-foreground transition-colors">
                Portail Citoyen
              </Link>
              <Link href="/blockchain" className="text-muted-foreground hover:text-foreground transition-colors">
                Blockchain
              </Link>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {user?.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Registre Foncier Numérique</h1>
            <p className="text-muted-foreground">Gestion sécurisée des parcelles sur blockchain</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Parcelle
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parcelles</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-chart-1" />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vérifiées</CardTitle>
              <CheckCircle className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,654</div>
              <p className="text-xs text-muted-foreground">93.2% du total</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,429</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-chart-1" />
                +8% cette semaine
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Litiges Actifs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-chart-1 rotate-180" />
                -15% ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="parcels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parcels">Parcelles ({filteredParcels.length})</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="map">Carte Interactive</TabsTrigger>
          </TabsList>

          <TabsContent value="parcels" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par localisation, propriétaire ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("all")}
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Tous
                </Button>
                <Button
                  variant={selectedStatus === "verified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("verified")}
                >
                  Vérifiés
                </Button>
                <Button
                  variant={selectedStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("pending")}
                >
                  En attente
                </Button>
                <Button
                  variant={selectedStatus === "dispute" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("dispute")}
                >
                  Litiges
                </Button>
              </div>
            </div>

            {/* Parcels Table */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Parcelles Enregistrées</CardTitle>
                <CardDescription>
                  Liste des parcelles avec leur statut blockchain et informations de propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredParcels.map((parcel) => (
                    <div
                      key={parcel.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all hover:shadow-sm"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{parcel.id}</h3>
                          {getStatusBadge(parcel.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Localisation:</span> {parcel.location}
                          </div>
                          <div>
                            <span className="font-medium">Propriétaire:</span> {parcel.owner}
                          </div>
                          <div>
                            <span className="font-medium">Superficie:</span> {parcel.area}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">NFT ID:</span>
                            <code className="ml-1 text-xs bg-muted px-1 rounded">{parcel.nftId}</code>
                          </div>
                          <div>
                            <span className="font-medium">Valeur:</span> {parcel.value}
                          </div>
                          <div>
                            <span className="font-medium">Transactions:</span> {parcel.transactions}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Transactions Récentes</CardTitle>
                <CardDescription>Historique des transactions blockchain en temps réel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-semibold">{transaction.parcel}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.from} → {transaction.to}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Hash: <code className="bg-muted px-1 rounded">{transaction.hash}</code>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="capitalize mb-1">
                          {transaction.type}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Carte Interactive des Parcelles</CardTitle>
                <CardDescription>Visualisation géographique avec données satellite et drone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-primary mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">Carte Interactive</h3>
                      <p className="text-muted-foreground">
                        Intégration avec les données satellite et drone en cours...
                      </p>
                    </div>
                    <Button className="animate-pulse">
                      <MapPin className="w-4 h-4 mr-2" />
                      Charger la carte
                    </Button>
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

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
