"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { CheckCircle, Clock, AlertCircle, FileText, Plus } from "lucide-react"
import TaskCard from "../../components/dashboard/task-card"
import ActivityFeed from "../../components/dashboard/activity-feed"
import TeamMembers from "../../components/dashboard/team-members"
import ProjectStats from "../../components/dashboard/project-stats"

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  // Dummy data for the dashboard
  const tasks = [
    {
      id: "1",
      title: "Design homepage mockup",
      description: "Create wireframes and mockups for the new homepage design",
      status: "in-progress",
      dueDate: "2023-06-15",
      assignee: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "2",
      title: "Implement authentication",
      description: "Set up user authentication and authorization",
      status: "todo",
      dueDate: "2023-06-20",
      assignee: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "3",
      title: "Create API documentation",
      description: "Document all API endpoints and parameters",
      status: "completed",
      dueDate: "2023-06-10",
      assignee: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "4",
      title: "Fix navigation bug",
      description: "Resolve the issue with the dropdown menu in the navigation",
      status: "todo",
      dueDate: "2023-06-18",
      assignee: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  const activities = [
    {
      id: "1",
      user: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "completed",
      target: "Create API documentation",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "commented on",
      target: "Design homepage mockup",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "uploaded",
      target: "project-requirements.pdf",
      timestamp: "Yesterday",
    },
    {
      id: "4",
      user: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "created",
      target: "Fix navigation bug",
      timestamp: "Yesterday",
    },
  ]

  const teamMembers = [
    {
      id: "1",
      name: "Demo User",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
    },
    {
      id: "3",
      name: "John Doe",
      role: "Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      role: "Content Writer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
    },
  ]

  const stats = [
    {
      title: "Total Tasks",
      value: "12",
      icon: FileText,
      change: "+2 this week",
      trend: "up",
    },
    {
      title: "Completed",
      value: "5",
      icon: CheckCircle,
      change: "+1 today",
      trend: "up",
    },
    {
      title: "In Progress",
      value: "3",
      icon: Clock,
      change: "No change",
      trend: "neutral",
    },
    {
      title: "Overdue",
      value: "2",
      icon: AlertCircle,
      change: "-1 this week",
      trend: "down",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || "User"}</h1>
        <p className="text-gray-600">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <ProjectStats key={stat.title} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Tasks</h2>
              <button className="btn-outline flex items-center text-sm">
                <Plus className="h-4 w-4 mr-1" /> Add Task
              </button>
            </div>
            <div className="p-4 grid gap-4">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                tasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Files</h2>
            </div>
            <div className="p-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 mb-2">Drag and drop files here or click to upload</p>
                <button className="btn-primary text-sm">Upload Files</button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Recent files will appear here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Team Members</h2>
            </div>
            <div className="p-4">
              <TeamMembers members={teamMembers} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="p-4">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
