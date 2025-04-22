"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/features/authSlice"
import { Eye, EyeOff, AlertCircle, CheckCircle, User, Mail, Key } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsLoading(true)

      // This is where you would normally make an API call
      // For now, we'll simulate registration with dummy data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      dispatch(
        register({
          user: {
            id: Date.now().toString(),
            name,
            email,
            avatar: "/placeholder.svg?height=40&width=40",
          },
          token: `dummy-token-${Date.now()}`,
        }),
      )

      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image and Text */}
      <div className="w-full max-h-screen hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-pink-500 text-white flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Start Your Journey With Us</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Join thousands of users who have already discovered the power of our platform. Create your account today and
            unlock a world of possibilities.
          </p>
          <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-2xl mb-8">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="People collaborating"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=40&width=40&text=User${i}`}
                    alt={`User ${i}`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Join 10,000+ users already on our platform</p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full max-h-screen md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-[Poppins]">Create Your Account</h2>
            <p className="text-sm text-gray-500">
              Already a member?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-lg flex items-start gap-3 border border-red-100 animate-fade-in mb-6">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-indigo-800">Password Requirements:</p>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                <span className={`text-sm ${password.length >= 8 ? "text-green-700" : "text-gray-500"}`}>
                  Minimum 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${password === confirmPassword && password !== "" ? "text-green-500" : "text-gray-300"}`}
                />
                <span
                  className={`text-sm ${password === confirmPassword && password !== "" ? "text-green-700" : "text-gray-500"}`}
                >
                  Passwords match
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            By registering, you agree to our{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
