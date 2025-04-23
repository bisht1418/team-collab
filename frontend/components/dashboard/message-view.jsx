"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  MoreHorizontal,
  Search,
  Smile,
  Paperclip,
  Send,
  ImageIcon,
} from "lucide-react"

export function MessageView() {
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const customerInfo = {
    name: "Rucas Royal",
    location: "Surakarta, Indonesia",
    rating: "5/5",
    avatar: "/placeholder.svg?height=48&width=48&text=RR",
  }

  const product = {
    name: "Black Jacket",
    price: "Rp 439,000",
    image: "/placeholder.svg?height=80&width=80",
    category: "Outerwear",
  }

  const messages = [
    {
      id: 1,
      sender: "customer",
      text: "Is this jacket waterproof and warm?",
      time: "08:24 PM",
      date: "29 July 2024",
    },
    {
      id: 2,
      sender: "agent",
      text: "The jacket is insulated with premium down filling, providing excellent warmth even in cold weather conditions.",
      time: "08:25 PM",
      date: "29 July 2024",
    },
    {
      id: 3,
      sender: "customer",
      text: "That's great! What kind of insulation does it have?",
      time: "08:25 PM",
      date: "29 July 2024",
    },
    {
      id: 4,
      sender: "agent",
      text: "Yes, it's waterproof! The outer shell is made with a durable water-repellent coating that keeps you dry in light to moderate rain.",
      time: "08:26 PM",
      date: "29 July 2024",
    },
    {
      id: 5,
      sender: "customer",
      text: "Nice! How about the breathability? I don't want to feel too hot if I'm active.",
      time: "10:55 PM",
      date: "29 July 2024",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-white border-l">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <img
              src={customerInfo.avatar}
              alt={customerInfo.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium">{customerInfo.name}</h2>
            <p className="text-sm text-muted-foreground">
              {customerInfo.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Rate {customerInfo.rating}</span>
          <div className="ml-1 flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="h-4 w-4 fill-primary"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
          </div>
          <Search className="h-4 w-4" />
          <MoreHorizontal className="h-4 w-4" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "agent" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "customer" && (
              <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                <img
                  src={customerInfo.avatar}
                  alt={customerInfo.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === "agent"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="mt-1 text-right text-xs opacity-70">
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {/* Product suggestion */}
        <div className="my-4 flex justify-end">
          <div className="max-w-[70%] rounded-lg border p-3">
            <div className="flex gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="mt-1 font-medium">{product.price}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="text-center text-xs text-muted-foreground">
          {messages[messages.length - 1].date}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5 cursor-pointer" />
          <Paperclip className="h-5 w-5 cursor-pointer" />
          <ImageIcon className="h-5 w-5 cursor-pointer" />
          <input
            placeholder="Enter a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 border rounded focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 text-white bg-indigo-600 rounded disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
