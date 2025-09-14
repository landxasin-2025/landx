"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Bot,
  User,
  Phone,
  Mail,
  MapPin,
  Download,
  Eye,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { Users } from "lucide-react" // Import Users component

// Mock data for user applications
const userApplications = [
  {
    id: "APP-001-2024",
    type: "Demande de titre foncier",
    parcel: "Dakar, Parcelle 127/A",
    status: "in-progress",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-15",
    progress: 65,
    nextStep: "Vérification terrain par drone",
  },
  {
    id: "APP-002-2024",
    type: "Mutation de propriété",
    parcel: "Thiès, Lot 45/B",
    status: "approved",
    submittedDate: "2023-12-20",
    lastUpdate: "2024-01-12",
    progress: 100,
    nextStep: "Terminé",
  },
  {
    id: "APP-003-2024",
    type: "Signalement de litige",
    parcel: "Kaolack, Zone C",
    status: "under-review",
    submittedDate: "2024-01-08",
    lastUpdate: "2024-01-14",
    progress: 30,
    nextStep: "Enquête sur le terrain",
  },
]

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    message: "Bonjour ! Je suis l'assistant virtuel TerraTrust. Comment puis-je vous aider aujourd'hui ?",
    timestamp: "10:30",
  },
]

export default function PortalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot" as const,
        message: getBotResponse(newMessage),
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setNewMessage("")
  }

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()

    if (message.includes("vérifier") || message.includes("parcelle") || message.includes("terrain")) {
      return "Pour vérifier le statut d'une parcelle, vous pouvez utiliser notre outil de recherche en haut de la page. Entrez l'ID de la parcelle ou l'adresse. Voulez-vous que je vous guide ?"
    }

    if (message.includes("demande") || message.includes("titre") || message.includes("document")) {
      return "Pour faire une demande de titre foncier, rendez-vous dans l'onglet 'Nouvelle Demande'. Vous aurez besoin de vos documents d'identité et de justificatifs de propriété. Le processus prend généralement 30-45 jours."
    }

    if (message.includes("litige") || message.includes("conflit") || message.includes("problème")) {
      return "Pour signaler un litige, utilisez l'onglet 'Signaler un Problème'. Décrivez la situation en détail et joignez tous les documents pertinents. Notre équipe traitera votre signalement sous 48h."
    }

    if (message.includes("statut") || message.includes("suivi") || message.includes("dossier")) {
      return "Vous pouvez suivre l'état de vos demandes dans l'onglet 'Mes Demandes'. Chaque dossier affiche son statut en temps réel et les prochaines étapes."
    }

    return "Je comprends votre question. Pour une assistance personnalisée, vous pouvez contacter notre service client au +221 33 123 45 67 ou consulter notre centre d'aide en ligne."
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approuvé
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        )
      case "under-review":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <Eye className="w-3 h-3 mr-1" />
            En révision
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Rejeté
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const handleSubmitReport = () => {
    if (!reportTitle.trim() || !reportDescription.trim()) return

    // Simulate form submission
    alert("Votre signalement a été soumis avec succès. Vous recevrez une confirmation par email.")
    setReportTitle("")
    setReportDescription("")
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
              <Link href="/portal" className="text-primary font-medium">
                Portail Citoyen
              </Link>
              <Link href="/blockchain" className="text-muted-foreground hover:text-foreground transition-colors">
                Blockchain
              </Link>
              <Button variant="outline" size="sm">
                Mon Compte
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Portail Citoyen</h1>
          <p className="text-muted-foreground">
            Vérifiez vos terres, suivez vos demandes et obtenez de l'aide instantanée
          </p>
        </div>

        {/* Quick Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Vérification Rapide de Parcelle
            </CardTitle>
            <CardDescription>Entrez l'ID de parcelle ou l'adresse pour vérifier le statut de propriété</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Ex: TT-001-2024 ou Dakar, Parcelle 127/A"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Vérifier
              </Button>
            </div>
            {searchTerm && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Parcelle trouvée: {searchTerm}</h3>
                    <p className="text-sm text-muted-foreground">Propriétaire: Amadou Diallo</p>
                    <p className="text-sm text-muted-foreground">Statut: Vérifié sur blockchain</p>
                  </div>
                  <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="applications" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="applications">Mes Demandes</TabsTrigger>
                <TabsTrigger value="new-request">Nouvelle Demande</TabsTrigger>
                <TabsTrigger value="report">Signaler un Problème</TabsTrigger>
              </TabsList>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suivi de mes Demandes</CardTitle>
                    <CardDescription>Consultez l'état d'avancement de vos démarches foncières</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userApplications.map((app) => (
                        <div key={app.id} className="border border-border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold">{app.type}</h3>
                              <p className="text-sm text-muted-foreground">{app.parcel}</p>
                              <p className="text-xs text-muted-foreground">ID: {app.id}</p>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progression</span>
                              <span>{app.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${app.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Soumis le:</span> {app.submittedDate}
                            </div>
                            <div>
                              <span className="font-medium">Dernière MAJ:</span> {app.lastUpdate}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="text-sm">
                              <span className="font-medium">Prochaine étape:</span> {app.nextStep}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Détails
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Documents
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new-request" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Demande de Titre Foncier
                      </CardTitle>
                      <CardDescription>Obtenez un titre de propriété officiel pour votre terrain</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Commencer la demande
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        Mutation de Propriété
                      </CardTitle>
                      <CardDescription>Transférez la propriété d'un terrain à un nouveau propriétaire</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Commencer la mutation
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-chart-1" />
                        Demande de Bornage
                      </CardTitle>
                      <CardDescription>Délimitez officiellement les limites de votre propriété</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Demander un bornage
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-chart-2" />
                        Vérification de Statut
                      </CardTitle>
                      <CardDescription>Vérifiez et mettez à jour le statut de votre propriété</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Vérifier le statut
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="report" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Signaler un Problème
                    </CardTitle>
                    <CardDescription>
                      Signalez un litige, une occupation illégale ou tout autre problème foncier
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Titre du problème</label>
                      <Input
                        placeholder="Ex: Occupation illégale de ma parcelle"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description détaillée</label>
                      <Textarea
                        placeholder="Décrivez le problème en détail, incluez les dates, lieux et personnes impliquées..."
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Documents justificatifs</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Glissez vos documents ici ou cliquez pour sélectionner
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Choisir des fichiers
                        </Button>
                      </div>
                    </div>

                    <Button onClick={handleSubmitReport} className="w-full">
                      Soumettre le signalement
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chatbot Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Assistant TerraTrust
                </CardTitle>
                <CardDescription>Obtenez de l'aide instantanée pour vos questions foncières</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "bot" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10">
                              <Bot className="h-4 w-4 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-accent/10">
                              <User className="h-4 w-4 text-accent" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+221 33 123 45 67</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@terratrust.sn</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Lun-Ven: 8h-18h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
