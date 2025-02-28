import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  return loader ? (
    <div className="flex items-center justify-center min-h-screen bg-[#A6C36F]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#335145] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-[#335145]">Loading...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}