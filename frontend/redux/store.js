"use client"

import { configureStore } from "@reduxjs/toolkit"
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./features/authSlice"
import chatReducer from "./features/chatSlice"

// Configure persist for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "refreshToken", "isAuthenticated"], // Only persist these properties
}

// Configure persist for chat
const chatPersistConfig = {
  key: "chat",
  storage,
  whitelist: ["chats", "userStatuses"], // Only persist essential chat data
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    chat: persistedChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)