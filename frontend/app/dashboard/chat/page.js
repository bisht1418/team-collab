"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import chatService from "../../../services/chatService"
import { resetChat } from "../../../redux/features/chatSlice"
import { MessageList } from "../../../components/dashboard/message-list"
import { MessageView } from "../../../components/dashboard/message-view"

export default function MessagesPage() {
  const { isAuthenticated, token } = useSelector((state) => state.auth)
  const { error } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    
    if (token) {
      chatService.setupSocket(token)
    }
    
    return () => {
      dispatch(resetChat())
      chatService.cleanup()
    }
  }, [isAuthenticated, token, router, dispatch])
  

  useEffect(() => {
    if (error) {
      console.error("Chat error:", error)
      const timeout = setTimeout(() => {
        dispatch({ type: "chat/clearError" })
      }, 5000)
      
      return () => clearTimeout(timeout)
    }
  }, [error, dispatch])

  if (!isAuthenticated) {
    return <div className="flex h-full items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex h-full">
      <MessageList />
      <MessageView />
    </div>
  )
}