"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar"
import DashboardHeader from "../../components/dashboard/dashboard-header"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    const isLoggedOut = sessionStorage.getItem("loggedOut");

    if (!isLoading && !isAuthenticated) {
      if (!isLoggedOut) {
        router.push("/login");
      }
      sessionStorage.removeItem("loggedOut"); // clean up
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}