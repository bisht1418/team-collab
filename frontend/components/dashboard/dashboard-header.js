"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../..//redux/features/authSlice"
import { Bell, Search, Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react"

export default function DashboardHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    sessionStorage.setItem("loggedOut", "true");
    dispatch(logout());
    router.push("/");
  };

  const notifications = [
    {
      id: "1",
      title: "New task assigned",
      description: 'You have been assigned to "Fix navigation bug"',
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Comment on your task",
      description: 'John commented on "Design homepage mockup"',
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Meeting reminder",
      description: "Team meeting in 30 minutes",
      time: "Yesterday",
      read: true,
    },
  ]

  return (
    <header className="bg-white shadow-sm bg-[#ededff]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4 flex justify-between h-16">

            <div className="relative ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
            
            <div className="relative flex gap-6">

              <button
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-10 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-2 px-4 border-b">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? "" : "bg-blue-50"}`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="py-2 px-4 border-t text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-500">View all notifications</button>
                  </div>
                </div>
              )}

              <button
                className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md p-1"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={user?.name || "User"}
                />
                <span className="hidden md:block font-medium text-gray-700">{user?.name || "User"}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" /> Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="sr-only">Open main menu</span>
              {showMobileMenu ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-4 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.avatar || "/placeholder.svg?height=40&width=40"}
                  alt={user?.name || "User"}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name || "User"}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || "user@example.com"}</div>
              </div>
              <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                Your Profile
              </button>
              <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
