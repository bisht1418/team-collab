"use client"

import { MessageList } from "../../../components/dashboard/message-list"
import { MessageView } from "../../../components/dashboard/message-view"

export default function MessagesPage() {
  return (
    <div className="flex h-full">
      <MessageList />
      <MessageView />
    </div>
  )
}