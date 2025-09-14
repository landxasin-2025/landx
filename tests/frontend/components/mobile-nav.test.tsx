import { render, screen, fireEvent } from "@testing-library/react"
import { MobileNav } from "@/components/mobile-nav"
import jest from "jest"

// Mock du hook d'authentification
jest.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}))

describe("MobileNav Component", () => {
  test("renders hamburger menu button", () => {
    render(<MobileNav />)
    const menuButton = screen.getByRole("button", { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  test("opens menu when hamburger is clicked", () => {
    render(<MobileNav />)
    const menuButton = screen.getByRole("button", { name: /menu/i })

    fireEvent.click(menuButton)

    expect(screen.getByText("TerraTrust")).toBeInTheDocument()
    expect(screen.getByText("Fonctionnalités")).toBeInTheDocument()
  })

  test("shows login buttons when user is not authenticated", () => {
    render(<MobileNav />)
    const menuButton = screen.getByRole("button", { name: /menu/i })

    fireEvent.click(menuButton)

    expect(screen.getByText("Connexion")).toBeInTheDocument()
    expect(screen.getByText("Inscription")).toBeInTheDocument()
  })

  test("closes menu when close button is clicked", () => {
    render(<MobileNav />)
    const menuButton = screen.getByRole("button", { name: /menu/i })

    fireEvent.click(menuButton)

    const closeButton = screen.getByRole("button", { name: /fermer/i })
    fireEvent.click(closeButton)

    expect(screen.queryByText("Fonctionnalités")).not.toBeInTheDocument()
  })
})
