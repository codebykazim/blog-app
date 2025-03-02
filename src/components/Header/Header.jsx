"use client"

import { useState } from "react"
import { Container, Logo, LogoutButton } from "../index"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Container>
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link to="/" className="transition-transform hover:scale-105">
                <Logo width="120px" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-8">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`px-3 py-2 text-gray-600 font-medium hover:text-purple-500 relative
                        ${location.pathname === item.slug ? "text-purple-500" : ""}
                        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                        after:bg-purple-500 after:scale-x-0 hover:after:scale-x-100
                        ${location.pathname === item.slug ? "after:scale-x-100" : ""}
                        after:transition-transform after:duration-300`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ),
              )}
              {authStatus && (
                <li className="ml-2">
                  <LogoutButton className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2" />
                </li>
              )}
            </ul>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100">
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
                          className={`w-full px-4 py-2 text-left text-gray-600 hover:text-purple-500
                          hover:bg-gray-50 rounded-lg font-medium transition-colors
                          ${location.pathname === item.slug ? "text-purple-500" : ""}`}
                        >
                          {item.name}
                        </button>
                      </li>
                    ),
                )}
                {authStatus && (
                  <li className="px-4 py-2">
                    <LogoutButton className="w-full bg-purple-500 hover:bg-purple-600 text-white" />
                  </li>
                )}
              </ul>
            </div>
          )}
        </Container>
      </header>

      {/* Blog Banner Section */}
      {location.pathname === "/" && (
        <Container className="px-4 py-4 w-full">


          <div className="relative bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-2xl overflow-hidden">
            {/* Decorative Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-10 w-14 h-14 border-2 border-purple-300/50 rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-20 h-20 border-2 border-purple-300/50 rounded-full" />
      <div className="absolute top-2/3 left-1/2 w-10 h-10 border-2 border-purple-300/50 rounded-full" />
    </div>

            {/* Content */}
            <div className="relative py-8">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Blog</h1>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export default Header