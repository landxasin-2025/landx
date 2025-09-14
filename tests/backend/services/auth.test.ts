import { AuthService } from "@/backend/services/auth"

describe("AuthService", () => {
  describe("hashPassword", () => {
    test("should hash password correctly", async () => {
      const password = "testpassword123"
      const hashedPassword = await AuthService.hashPassword(password)

      expect(hashedPassword).toBeDefined()
      expect(hashedPassword).not.toBe(password)
      expect(hashedPassword.length).toBeGreaterThan(50)
    })
  })

  describe("verifyPassword", () => {
    test("should verify correct password", async () => {
      const password = "testpassword123"
      const hashedPassword = await AuthService.hashPassword(password)

      const isValid = await AuthService.verifyPassword(password, hashedPassword)
      expect(isValid).toBe(true)
    })

    test("should reject incorrect password", async () => {
      const password = "testpassword123"
      const wrongPassword = "wrongpassword"
      const hashedPassword = await AuthService.hashPassword(password)

      const isValid = await AuthService.verifyPassword(wrongPassword, hashedPassword)
      expect(isValid).toBe(false)
    })
  })

  describe("generateToken", () => {
    test("should generate valid JWT token", () => {
      const user = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "CITIZEN" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const token = AuthService.generateToken(user)

      expect(token).toBeDefined()
      expect(typeof token).toBe("string")
      expect(token.split(".")).toHaveLength(3) // JWT has 3 parts
    })
  })

  describe("verifyToken", () => {
    test("should verify valid token", () => {
      const user = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "CITIZEN" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const token = AuthService.generateToken(user)
      const decoded = AuthService.verifyToken(token)

      expect(decoded.userId).toBe(user.id)
      expect(decoded.email).toBe(user.email)
      expect(decoded.role).toBe(user.role)
    })

    test("should throw error for invalid token", () => {
      const invalidToken = "invalid.token.here"

      expect(() => {
        AuthService.verifyToken(invalidToken)
      }).toThrow("Token invalide")
    })
  })
})
