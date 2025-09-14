"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, TrendingUp, Brain, Clock, Users, Target, Zap, Bell, Eye, Download } from "lucide-react"
import Link from "next/link"

// Mock data for conflict predictions
const riskAreas = [
  {
    id: "RISK-001",
    location: "Kétou ",
    riskLevel: "&levé",
    riskScore: 87,
    factors: ["Densité population élevée", "Projets infrastructure", "Historique litiges"],
    predictedDate: "2025-10-15",
    affectedParcels: 23,
    population: 45000,
    recommendations: ["Médiation préventive", "Régularisation foncière", "Consultation communautaire"],
  },
  {
    id: "RISK-002",
    location: "Parakou-Arafath",
    riskLevel: "moyen",
    riskScore: 64,
    factors: ["Croissance urbaine", "Limites floues", "Pression foncière"],
    predictedDate: "2025-12-20",
    affectedParcels: 15,
    population: 28000,
    recommendations: ["Bornage urgent", "Sensibilisation", "Renforcement surveillance"],
  },
  {
    id: "RISK-003",
    location: "Natitingou - Ourbouga",
    riskLevel: "faible",
    riskScore: 32,
    factors: ["Zone résidentielle stable", "Titres sécurisés"],
    predictedDate: "2027-06-10",
    affectedParcels: 8,
    population: 12000,
    recommendations: ["Surveillance de routine", "Maintien du statut"],
  },
  {
    id: "RISK-004",
    location: "Cotonou - Hair-Vive",
    riskLevel: "élevé",
    riskScore: 91,
    factors: ["Expansion portuaire", "Déplacements forcés", "Compensation insuffisante"],
    predictedDate: "2028-02-01",
    affectedParcels: 34,
    population: 67000,
    recommendations: ["Négociation urgente", "Plan de relogement", "Compensation équitable"],
  },
]

const historicalConflicts = [
  {
    id: "CONF-001",
    location: "Parakou-Bannikani",
    date: "2023-11-15",
    type: "Limite territoriale",
    status: "resolved",
    duration: "45 jours",
    parties: 2,
    resolution: "Médiation traditionnelle",
  },
  {
    id: "CONF-002",
    location: "Ouagadougou - Secteur 30",
    date: "2023-10-22",
    type: "Double attribution",
    status: "ongoing",
    duration: "78 jours",
    parties: 3,
    resolution: "En cours",
  },
  {
    id: "CONF-003",
    location: "Cotonou - Akpakpa",
    date: "2023-09-08",
    type: "Héritage familial",
    status: "resolved",
    duration: "23 jours",
    parties: 4,
    resolution: "Arbitrage familial",
  },
]

const alerts = [
  {
    id: "ALERT-001",
    type: "urgent",
    title: "Risque élevé détecté - Dakar Pikine",
    message: "Augmentation significative des indicateurs de conflit. Action immédiate recommandée.",
    timestamp: "Il y a 2 heures",
    priority: "high",
  },
  {
    id: "ALERT-002",
    type: "warning",
    title: "Surveillance renforcée - Abidjan Yopougon",
    message: "Évolution des facteurs de risque. Surveillance recommandée.",
    timestamp: "Il y a 6 heures",
    priority: "medium",
  },
  {
    id: "ALERT-003",
    type: "info",
    title: "Mise à jour modèle IA",
    message: "Nouveau modèle prédictif déployé avec 15% d'amélioration de précision.",
    timestamp: "Il y a 1 jour",
    priority: "low",
  },
]

export default function ConflictsPage() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)

  const getRiskBadge = (level: string, score: number) => {
    switch (level) {
      case "high":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Élevé ({score}%)
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-200">
            <Clock className="w-3 h-3" />
            Moyen ({score}%)
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20 flex items-center gap-1">
            <Target className="w-3 h-3" />
            Faible ({score}%)
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">Résolu</Badge>
      case "ongoing":
        return <Badge variant="secondary">En cours</Badge>
      case "escalated":
        return <Badge variant="destructive">Escaladé</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "warning":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "info":
        return <Bell className="w-4 h-4 text-primary" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
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
              <Link href="/conflicts" className="text-primary font-medium">
                Analyse des Conflits
              </Link>
              <Link href="/portal" className="text-muted-foreground hover:text-foreground transition-colors">
                Portail Citoyen
              </Link>
              <Link href="/blockchain" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Système de Prédiction des Conflits</h1>
          <p className="text-muted-foreground">
            Intelligence artificielle pour la prévention proactive des litiges fonciers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Zones à Risque</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conflits Prévenus</CardTitle>
              <Target className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Ce trimestre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Précision IA</CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18j</div>
              <p className="text-xs text-muted-foreground">Résolution conflit</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Alertes Récentes</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                className={
                  alert.priority === "high"
                    ? "border-destructive"
                    : alert.priority === "medium"
                      ? "border-amber-200"
                      : "border-border"
                }
              >
                {getAlertIcon(alert.type)}
                <AlertTitle className="flex items-center justify-between">
                  {alert.title}
                  <span className="text-xs text-muted-foreground font-normal">{alert.timestamp}</span>
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predictions">Prédictions</TabsTrigger>
            <TabsTrigger value="historical">Historique</TabsTrigger>
            <TabsTrigger value="analytics">Analytics IA</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Zones à Risque Identifiées
                </CardTitle>
                <CardDescription>
                  Analyse prédictive basée sur l'IA pour identifier les zones susceptibles de connaître des conflits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAreas.map((area) => (
                    <div
                      key={area.id}
                      className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{area.location}</h3>
                            {getRiskBadge(area.riskLevel, area.riskScore)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Prédiction: Conflit potentiel le {area.predictedDate}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                          <Button size="sm">
                            <Zap className="w-4 h-4 mr-1" />
                            Action
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Parcelles affectées</div>
                          <div className="text-2xl font-bold text-primary">{area.affectedParcels}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Population concernée</div>
                          <div className="text-2xl font-bold text-accent">{area.population.toLocaleString()}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Score de risque</div>
                          <div className="space-y-2">
                            <Progress value={area.riskScore} className="h-2" />
                            <div className="text-sm text-muted-foreground">{area.riskScore}% de probabilité</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium mb-2">Facteurs de risque identifiés:</div>
                          <div className="flex flex-wrap gap-2">
                            {area.factors.map((factor, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Recommandations IA:</div>
                          <ul className="space-y-1">
                            {area.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Historique des Conflits
                </CardTitle>
                <CardDescription>Analyse des conflits passés pour améliorer les prédictions futures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalConflicts.map((conflict) => (
                    <div
                      key={conflict.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{conflict.location}</h3>
                          {getStatusBadge(conflict.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Type:</span> {conflict.type}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {conflict.date}
                          </div>
                          <div>
                            <span className="font-medium">Durée:</span> {conflict.duration}
                          </div>
                          <div>
                            <span className="font-medium">Parties:</span> {conflict.parties}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-foreground">Résolution:</span> {conflict.resolution}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Rapport
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-chart-1" />
                    Performance du Modèle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Précision</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rappel</span>
                        <span>89.7%</span>
                      </div>
                      <Progress value={89.7} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>F1-Score</span>
                        <span>91.8%</span>
                      </div>
                      <Progress value={91.8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-chart-2" />
                    Impact Prévention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-chart-1">47</div>
                      <div className="text-sm text-muted-foreground">Conflits prévenus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-chart-2">156,000</div>
                      <div className="text-sm text-muted-foreground">Personnes protégées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">2.4M€</div>
                      <div className="text-sm text-muted-foreground">Coûts évités</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Facteurs de Risque les Plus Prédictifs</CardTitle>
                <CardDescription>Variables ayant le plus d'impact sur les prédictions du modèle IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: "Densité de population", importance: 87 },
                    { factor: "Historique de litiges", importance: 82 },
                    { factor: "Projets d'infrastructure", importance: 76 },
                    { factor: "Pression foncière", importance: 71 },
                    { factor: "Croissance urbaine", importance: 68 },
                    { factor: "Qualité des titres", importance: 64 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.factor}</span>
                        <span>{item.importance}%</span>
                      </div>
                      <Progress value={item.importance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
