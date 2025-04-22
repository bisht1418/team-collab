import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function TaskCard({ task }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "todo":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "todo":
        return "To Do"
      default:
        return status
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "todo":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2">
          {getStatusIcon(task.status)}
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(task.status)}`}>
            {getStatusText(task.status)}
          </span>
          {task.priority && (
            <span className={`mt-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img
            src={task.assignee.avatar || "/placeholder.svg"}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs text-gray-500 ml-2">{task.assignee.name}</span>
        </div>
        <span className="text-xs text-gray-500">Due {formatDate(task.dueDate)}</span>
      </div>
    </div>
  )
}
