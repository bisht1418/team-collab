"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  MessageSquare,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: FileText,
    },
    {
      name: "Chat",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
  ]

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-10 transition-opacity duration-300 ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setIsMobileOpen(false)}></div>
        <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transition-transform duration-300 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}">
          <div className="h-full flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                TeamSync
              </Link>
              <button onClick={() => setIsMobileOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md mb-1 ${
                    isActive(item.href) ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
              <Link
                href="/dashboard/help"
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block bg-white border-r transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link href="/dashboard" className={`text-xl font-bold text-indigo-600 ${isCollapsed ? "hidden" : "block"}`}>
            TeamSync
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md mb-1 ${
                isActive(item.href) ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/dashboard/settings"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 mr-3" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
          <Link
            href="/dashboard/help"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            {!isCollapsed && <span>Help & Support</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}
