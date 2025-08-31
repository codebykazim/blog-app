"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login")
    } else if (!authentication && authStatus) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  return loader ? (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-white">Loading...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
