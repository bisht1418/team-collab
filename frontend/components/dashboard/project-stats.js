import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export default function ProjectStats({ stat }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "neutral":
        return <Minus className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getTrendClass = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      case "neutral":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const IconComponent = stat.icon

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
        <div className="p-2 bg-indigo-100 rounded-md">
          <IconComponent className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold">{stat.value}</p>
        <div className={`flex items-center ml-2 ${getTrendClass(stat.trend)}`}>
          {getTrendIcon(stat.trend)}
          <span className="text-xs ml-1">{stat.change}</span>
        </div>
      </div>
    </div>
  )
}
