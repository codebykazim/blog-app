"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"
import "./index.css"

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900">Loading BlogHub...</h1>
        <p className="text-gray-600 mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  )
}

export default App
