import { describe, beforeEach, it } from "mocha"
import { cy } from "cypress"

describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should display login and demo buttons on homepage", () => {
    cy.get('[data-testid="login-button"]').should("be.visible")
    cy.get('[data-testid="demo-button"]').should("be.visible")
  })

  it("should navigate to login page when login button is clicked", () => {
    cy.get('[data-testid="login-button"]').click()
    cy.url().should("include", "/login")
    cy.get("h1").should("contain", "Connexion")
  })

  it("should show mobile menu on small screens", () => {
    cy.viewport("iphone-6")
    cy.get('[data-testid="mobile-menu-button"]').should("be.visible")
    cy.get('[data-testid="mobile-menu-button"]').click()
    cy.get('[data-testid="mobile-menu"]').should("be.visible")
  })

  it("should complete login flow successfully", () => {
    cy.visit("/login")

    cy.get('input[name="email"]').type("admin@terratrust.com")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")
    cy.get('[data-testid="user-menu"]').should("be.visible")
  })

  it("should show error for invalid credentials", () => {
    cy.visit("/login")

    cy.get('input[name="email"]').type("wrong@email.com")
    cy.get('input[name="password"]').type("wrongpassword")
    cy.get('button[type="submit"]').click()

    cy.get('[data-testid="error-message"]').should("be.visible")
    cy.get('[data-testid="error-message"]').should("contain", "Identifiants invalides")
  })

  it("should logout successfully", () => {
    // Login first
    cy.visit("/login")
    cy.get('input[name="email"]').type("admin@terratrust.com")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()

    // Then logout
    cy.get('[data-testid="user-menu"]').click()
    cy.get('[data-testid="logout-button"]').click()

    cy.url().should("not.include", "/dashboard")
    cy.get('[data-testid="login-button"]').should("be.visible")
  })
})
