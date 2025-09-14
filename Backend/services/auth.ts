import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { User } from "../types"

export class AuthService {
  private static readonly JWT_SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret"
  private static readonly JWT_EXPIRES_IN = "7d"

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN },
    )
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET)
    } catch (error) {
      throw new Error("Token invalide")
    }
  }

  static async createUser(userData: {
    email: string
    password: string
    name: string
    role?: "ADMIN" | "AGENT" | "CITIZEN"
  }): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password)

    // Simulation de création utilisateur (à remplacer par vraie DB)
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      role: userData.role || "CITIZEN",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return user
  }

  static async validateUser(email: string, password: string): Promise<User | null> {
    // Simulation de validation (à remplacer par vraie DB)
    // En production, récupérer l'utilisateur depuis la base de données
    const mockUser: User = {
      id: "1",
      email: "admin@terratrust.com",
      name: "Administrateur",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const mockHashedPassword = await this.hashPassword("admin123")
    const isValid = await this.verifyPassword(password, mockHashedPassword)

    return isValid && email === mockUser.email ? mockUser : null
  }
}
