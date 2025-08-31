"use client"

import { useState } from "react"
import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { User, Mail, Lock, ArrowRight } from "lucide-react"

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const [error, setError] = useState()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) dispatch(login({ userData: currentUser }))
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
          <h2 className="text-3xl font-black text-gray-900 mb-2">Join BlogHub</h2>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-slide-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="pl-11"
              {...register("name", {
                required: true,
              })}
            />
          </div>

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
              placeholder="Create a password"
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
                Creating account...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-green-600 hover:text-green-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-green-600 hover:text-green-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
