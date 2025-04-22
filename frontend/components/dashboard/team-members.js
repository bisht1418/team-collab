export default function TeamMembers({ members }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="w-10 h-10 rounded-full" />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
              ></span>
            </div>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-500">Message</button>
        </div>
      ))}
    </div>
  )
}
