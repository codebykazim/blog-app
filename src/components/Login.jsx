"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import { Mail, Lock, ArrowRight } from "lucide-react"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-green-100">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">
            New to BlogHub?{" "}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-slide-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              className="pl-11"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="pl-11"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 transition-colors">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
