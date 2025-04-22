"use client"

import { useState } from "react"
import { Plus, Filter, Search, AlertTriangle, ChevronDown } from "lucide-react"
import TaskCard from "../../../components/dashboard/task-card"

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for tasks
  const allTasks = [
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
      priority: "high",
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
      priority: "medium",
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
      priority: "low",
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
      priority: "high",
    },
    {
      id: "5",
      title: "Update user profile page",
      description: "Add new fields and improve the layout of the user profile page",
      status: "in-progress",
      dueDate: "2023-06-22",
      assignee: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: "6",
      title: "Optimize database queries",
      description: "Improve performance by optimizing the most frequent database queries",
      status: "todo",
      dueDate: "2023-06-25",
      assignee: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "high",
    },
    {
      id: "7",
      title: "Write unit tests",
      description: "Create comprehensive unit tests for the authentication module",
      status: "todo",
      dueDate: "2023-06-28",
      assignee: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: "8",
      title: "Implement file upload feature",
      description: "Add the ability for users to upload and manage files",
      status: "completed",
      dueDate: "2023-06-08",
      assignee: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "high",
    },
  ]

  // Filter tasks based on status and search query
  const filteredTasks = allTasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-1" /> New Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button className="btn-outline flex items-center">
                  <Filter className="h-5 w-5 mr-1" /> Filter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {/* Filter dropdown would go here in a real implementation */}
              </div>

              <div className="flex rounded-md shadow-sm">
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-l-md ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${filter === "todo" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setFilter("todo")}
                >
                  To Do
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${filter === "in-progress" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setFilter("in-progress")}
                >
                  In Progress
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-r-md ${filter === "completed" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first task."}
              </p>
              {!searchQuery && (
                <button className="btn-primary mt-4 flex items-center mx-auto">
                  <Plus className="h-5 w-5 mr-1" /> New Task
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
