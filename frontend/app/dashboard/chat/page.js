"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { Send, Paperclip, Smile } from "lucide-react"

export default function Chat() {
  const { user } = useSelector((state) => state.auth)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Dummy data for team members
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

  // Dummy initial messages
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: {
          id: "3",
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Hey team, I just pushed the latest changes to the repository.",
        timestamp: "10:30 AM",
        isCurrentUser: false,
      },
      {
        id: "2",
        sender: {
          id: "2",
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Great! I'll review the design changes later today.",
        timestamp: "10:32 AM",
        isCurrentUser: false,
      },
      {
        id: "3",
        sender: {
          id: "1",
          name: "Demo User",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Sounds good. Let's schedule a quick call to discuss the feedback from the client.",
        timestamp: "10:35 AM",
        isCurrentUser: true,
      },
      {
        id: "4",
        sender: {
          id: "4",
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'm available after 2 PM today.",
        timestamp: "10:38 AM",
        isCurrentUser: false,
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="bg-white rounded-lg shadow flex flex-col flex-1">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">Team Chat</h1>
          <div className="flex items-center space-x-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="relative">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={member.name}
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                    member.status === "online"
                      ? "bg-green-500"
                      : member.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-xs md:max-w-md ${msg.isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                  <img
                    src={msg.sender.avatar || "/placeholder.svg"}
                    alt={msg.sender.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div
                    className={`mx-2 ${msg.isCurrentUser ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"} rounded-lg p-3`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{msg.sender.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <button type="button" className="text-gray-500 hover:text-gray-700" title="Attach file">
              <Paperclip className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700" title="Add emoji">
              <Smile className="h-5 w-5" />
            </button>
            <input
              type="text"
              className="input-field flex-1"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
