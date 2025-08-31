"use client"

import { useState } from "react"
import { Container, Logo, LogoutButton } from "../index"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Menu, X, PenTool, BookOpen } from "lucide-react"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", slug: "/", active: true, icon: BookOpen },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Write", slug: "/add-post", active: authStatus, icon: PenTool },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-green-100">
        <Container>
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link to="/" className="transition-transform hover:scale-105">
                <Logo width="120px" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`flex items-center gap-2 px-4 py-2 text-gray-700 font-medium rounded-full
                        transition-all duration-200 hover:bg-green-50 hover:text-green-700
                        ${location.pathname === item.slug ? "bg-green-100 text-green-700" : ""}`}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.name}
                      </button>
                    </li>
                  ),
              )}
              {authStatus && (
                <>
                  <li className="text-sm text-gray-600 px-3">
                    Welcome, <span className="font-semibold text-green-700">{userData?.name || "User"}</span>!
                  </li>
                  <li className="ml-2">
                    <LogoutButton className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-200" />
                  </li>
                </>
              )}
            </ul>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-green-100 bg-white/95 backdrop-blur-sm">
              <ul className="py-4 space-y-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => {
                            navigate(item.slug)
                            setIsMobileMenuOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                          hover:bg-green-50 hover:text-green-700 rounded-lg font-medium transition-colors
                          ${location.pathname === item.slug ? "bg-green-100 text-green-700" : ""}`}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </button>
                      </li>
                    ),
                )}
                {authStatus && (
                  <>
                    <li className="px-4 py-2 text-sm text-gray-600 border-t border-green-100 mt-2 pt-4">
                      Welcome, <span className="font-semibold text-green-700">{userData?.name || "User"}</span>!
                    </li>
                    <li className="px-4 py-2">
                      <LogoutButton className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium" />
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </Container>
      </header>

      {/* Hero Banner Section */}
      {location.pathname === "/" && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b border-green-100">
          <Container className="px-4 py-16 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 text-balance">
                Share Your <span className="text-green-600">Stories</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Discover amazing stories, share your thoughts, and connect with a community of passionate writers and
                readers.
              </p>
              {!authStatus && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold
                    transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Start Writing Today
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-full font-semibold
                    border-2 border-green-600 transition-all duration-200 hover:scale-105"
                  >
                    Sign In
                  </Link>
                </div>
              )}
              {authStatus && (
                <Link
                  to="/add-post"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold
                  transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <PenTool className="w-5 h-5" />
                  Write New Post
                </Link>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  )
}

export default Header
