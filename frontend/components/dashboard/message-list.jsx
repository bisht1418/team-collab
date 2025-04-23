"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function MessageList() {
  const [searchQuery, setSearchQuery] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Rucas Royal",
      message: "Is this jacket waterproof and warm?",
      time: "01:09 am",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40&text=RR",
    },
    {
      id: 2,
      name: "Leslie Alexander",
      message: "Do you have any new arrivals in medium size?",
      time: "01:08 pm",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40&text=LA",
    },
    {
      id: 3,
      name: "Floyd Miles",
      message: "I need a pair of comfortable jeans for everyday wear.",
      time: "06:32 pm",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40&text=FM",
    },
    {
      id: 4,
      name: "Guy Hawkins",
      message: "I'm attending a wedding soon. Do you have formal wear?",
      time: "10:32 pm",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40&text=GH",
    },
    {
      id: 5,
      name: "Wade Warren",
      message: "What are your best-selling accessories this season?",
      time: "Yesterday",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40&text=WW",
    },
    {
      id: 6,
      name: "Kathryn Murphy",
      message: "I'm looking for a cozy sweater. What do you recommend?",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40&text=KM",
    },
    {
      id: 7,
      name: "Cody Fisher",
      message: "Can you help me find a stylish hat for summer?",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40&text=CF",
    },
    {
      id: 8,
      name: "Esther Howard",
      message: "I need a pair of formal shoes for a business meeting.",
      time: "2 days ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40&text=EH",
    },
    {
      id: 9,
      name: "Ronald Richards",
      message: "I'm looking for a versatile jacket for travel.",
      time: "3 days ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40&text=RR",
    },
    {
      id: 10,
      name: "Jerome Bell",
      message: "Do you offer international shipping?",
      time: "4 days ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40&text=JB",
    },
  ]

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex w-80 flex-col border-r">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-muted/50 ${
              conversation.id === 1 ? "bg-muted" : ""
            }`}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <img
                src={conversation.avatar || "/placeholder.svg"}
                alt={conversation.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">{conversation.name}</p>
                <p className="text-xs text-muted-foreground">{conversation.time}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">{conversation.message}</p>
            </div>
            {conversation.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
