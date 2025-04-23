"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chats: [],
  activeChat: null,
  messages: [],
  isTyping: false,
  userStatuses: {}, // { userId: 'online' | 'offline' }
  isLoading: false,
  error: null,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
    fetchChatsSuccess: (state, action) => {
      state.chats = action.payload
      state.isLoading = false
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
      state.isLoading = false
    },
    setMessages: (state, action) => {
      state.messages = action.payload
      state.isLoading = false
    },
    addMessage: (state, action) => {
      // Add new message to messages array
      state.messages.push(action.payload)
      
      // Update the latestMessage in the corresponding chat
      const chatIndex = state.chats.findIndex(c => c._id === action.payload.chat._id)
      if (chatIndex !== -1) {
        state.chats[chatIndex].latestMessage = action.payload
        
        // Move this chat to the top of the list
        const updatedChat = state.chats[chatIndex]
        state.chats.splice(chatIndex, 1)
        state.chats.unshift(updatedChat)
      }
    },
    updateMessage: (state, action) => {
      const { messageId, updates } = action.payload
      const messageIndex = state.messages.findIndex(m => m._id === messageId)
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { 
          ...state.messages[messageIndex], 
          ...updates 
        }
      }
    },
    markMessageRead: (state, action) => {
      const { messageId, userId } = action.payload
      const messageIndex = state.messages.findIndex(m => m._id === messageId)
      if (messageIndex !== -1) {
        if (!state.messages[messageIndex].readBy) {
          state.messages[messageIndex].readBy = []
        }
        if (!state.messages[messageIndex].readBy.includes(userId)) {
          state.messages[messageIndex].readBy.push(userId)
        }
      }
    },
    setTyping: (state, action) => {
      if (state.activeChat && state.activeChat._id === action.payload) {
        state.isTyping = true
      }
    },
    stopTyping: (state, action) => {
      if (state.activeChat && state.activeChat._id === action.payload) {
        state.isTyping = false
      }
    },
    setUserStatus: (state, action) => {
      const { userId, status } = action.payload
      state.userStatuses[userId] = status
    },
    addChat: (state, action) => {
      // Add new chat to the beginning of the array
      state.chats.unshift(action.payload)
    },
    updateChat: (state, action) => {
      const chatIndex = state.chats.findIndex(c => c._id === action.payload._id)
      if (chatIndex !== -1) {
        state.chats[chatIndex] = action.payload
        
        // If this is the active chat, update it too
        if (state.activeChat && state.activeChat._id === action.payload._id) {
          state.activeChat = action.payload
        }
      }
    },
    clearChat: (state) => {
      state.activeChat = null
      state.messages = []
    },
    resetChat: () => initialState,
  },
})

export const {
  setLoading,
  setError,
  clearError,
  fetchChatsSuccess,
  setActiveChat,
  setMessages,
  addMessage,
  updateMessage,
  markMessageRead,
  setTyping,
  stopTyping,
  setUserStatus,
  addChat,
  updateChat,
  clearChat,
  resetChat,
} = chatSlice.actions

export default chatSlice.reducer