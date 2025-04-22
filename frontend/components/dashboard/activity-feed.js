export default function ActivityFeed({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <img
            src={activity.user.avatar || "/placeholder.svg"}
            alt={activity.user.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div>
            <div className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-gray-500">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
