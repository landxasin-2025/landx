"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Menu,
  User,
  Settings,
  LogOut,
  BarChart3,
  MapPin,
  AlertTriangle,
  Blocks,
  Home,
  Phone,
  Info,
} from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  isAuthenticated?: boolean
  userRole?: "admin" | "citizen" | "agent"
  userName?: string
  userEmail?: string
}

export function MobileNav({
  isAuthenticated = false,
  userRole = "citizen",
  userName = "Utilisateur",
  userEmail = "user@example.com",
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    window.location.href = "/"
    setIsOpen(false)
  }

  const closeSheet = () => setIsOpen(false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-600 border-red-200"
      case "agent":
        return "bg-blue-500/10 text-blue-600 border-blue-200"
      default:
        return "bg-green-500/10 text-green-600 border-green-200"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrateur"
      case "agent":
        return "Agent Foncier"
      default:
        return "Citoyen"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Menu className="h-6 w-6" />
          {isAuthenticated && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          )}
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground">TerraTrust</span>
            </div>

            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{userName}</p>
                    <p className="text-sm text-muted-foreground truncate">{userEmail}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`w-fit ${getRoleColor(userRole)}`}>
                  {getRoleLabel(userRole)}
                </Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Connectez-vous pour accéder à toutes les fonctionnalités
                </p>
              </div>
            )}
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            {isAuthenticated ? (
              <div className="p-6 space-y-6">
                {/* Dashboard Links */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Tableau de bord
                  </h3>
                  <Link
                    href="/dashboard"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <BarChart3 className="h-5 w-5 text-primary group-hover:text-primary/80" />
                    <span className="font-medium">Registre Foncier</span>
                  </Link>

                  <Link
                    href="/conflicts"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <AlertTriangle className="h-5 w-5 text-accent group-hover:text-accent/80" />
                    <span className="font-medium">Prédiction Conflits</span>
                  </Link>

                  <Link
                    href="/portal"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <User className="h-5 w-5 text-chart-1 group-hover:text-chart-1/80" />
                    <span className="font-medium">Portail Citoyen</span>
                  </Link>

                  <Link
                    href="/blockchain"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <Blocks className="h-5 w-5 text-chart-2 group-hover:text-chart-2/80" />
                    <span className="font-medium">Blockchain</span>
                  </Link>
                </div>

                <Separator />

                {/* Account Actions */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Compte</h3>
                  <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group w-full text-left">
                    <Settings className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    <span className="font-medium">Paramètres</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive/10 transition-colors group w-full text-left text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Public Navigation */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <Home className="h-5 w-5 text-primary group-hover:text-primary/80" />
                    <span className="font-medium text-lg">Accueil</span>
                  </Link>

                  <Link
                    href="#features"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    <span className="font-medium text-lg">Fonctionnalités</span>
                  </Link>

                  <Link
                    href="#technology"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <Blocks className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    <span className="font-medium text-lg">Technologie</span>
                  </Link>

                  <Link
                    href="#contact"
                    onClick={closeSheet}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <Phone className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    <span className="font-medium text-lg">Contact</span>
                  </Link>
                </div>

                <Separator />

                {/* Authentication Actions */}
                <div className="space-y-3">
                  <Button variant="outline" size="lg" asChild className="w-full justify-start bg-transparent">
                    <Link href="/login" onClick={closeSheet}>
                      <User className="h-5 w-5 mr-2" />
                      Connexion
                    </Link>
                  </Button>

                  <Button size="lg" asChild className="w-full justify-start">
                    <Link href="/login" onClick={closeSheet}>
                      <Shield className="h-5 w-5 mr-2" />
                      Démo Gratuite
                    </Link>
                  </Button>
                </div>

                {/* Info Section */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Nouveau sur TerraTrust ?</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Découvrez comment la blockchain révolutionne la gestion foncière au Bénin.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
