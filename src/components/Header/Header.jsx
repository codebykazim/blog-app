"use client"

import { useState } from "react"
import { Container, Logo, LogoutButton } from "../index"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0F3D3E] bg-opacity-80 backdrop-blur-md shadow-lg border-b border-[#F5E8C7]">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="transition-transform hover:scale-110">
              <Logo />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#3C6255] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#F5E8C7]" />
            ) : (
              <Menu className="w-6 h-6 text-[#F5E8C7]" />
            )}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2 rounded-lg font-semibold text-[#F5E8C7]
                      transition-all hover:text-[#FFD700] hover:bg-[#3C6255]
                      focus:outline-none focus:ring-2 focus:ring-[#F5E8C7]"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#F5E8C7] bg-[#0F3D3E]">
            <ul className="py-2 space-y-1">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug)
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left rounded-lg font-semibold text-[#F5E8C7]
                        transition-all hover:text-[#FFD700] hover:bg-[#3C6255]"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="px-4 py-2">
                  <LogoutButton className="w-full" />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
