"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ArrowRight, CheckCircle, FileText, MessageSquare } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold">TeamSync</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="hover:text-indigo-200 transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Collaborate with your team seamlessly</h1>
            <p className="text-xl mb-8">
              Track tasks, share files, and communicate in one unified platform designed for small teams.
            </p>
            <Link href="/register" className="btn-primary flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="bg-white rounded-lg shadow-xl p-6 text-gray-800 rounded-md">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" />
                  <span>Design homepage mockup</span>
                  <span className="ml-auto text-sm text-gray-500">Due tomorrow</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" />
                  <span>Review client feedback</span>
                  <span className="ml-auto text-sm text-gray-500">Completed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-indigo-500 mr-2" />
                  <span>Prepare presentation</span>
                  <span className="ml-auto text-sm text-gray-500">In progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Everything your team needs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress.
              </p>
            </div>

            <div className="card">
              <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">File Sharing</h3>
              <p className="text-gray-600">
                Upload, organize, and share files with your team. Keep all project assets in one place.
              </p>
            </div>

            <div className="card">
              <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Chat</h3>
              <p className="text-gray-600">
                Communicate in real-time with your team members. Share updates and collaborate effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by teams worldwide</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <p className="text-gray-600 mb-4">
                "TeamSync has transformed how our design team collaborates. We've reduced meeting time by 30% and
                improved project delivery."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-indigo-800">JD</span>
                </div>
                <div>
                  <h4 className="font-medium">Jane Doe</h4>
                  <p className="text-sm text-gray-500">Design Director, Acme Inc</p>
                </div>
              </div>
            </div>

            <div className="card">
              <p className="text-gray-600 mb-4">
                "As a remote team, we needed a solution that keeps everyone aligned. TeamSync provides exactly that with
                minimal learning curve."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-indigo-800">MS</span>
                </div>
                <div>
                  <h4 className="font-medium">Mike Smith</h4>
                  <p className="text-sm text-gray-500">CTO, TechStart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teams who use TeamSync to collaborate effectively and deliver projects on time.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors inline-flex items-center"
          >
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">TeamSync</h3>
              <p className="mt-2 text-gray-400">Collaboration made simple</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 TeamSync. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
