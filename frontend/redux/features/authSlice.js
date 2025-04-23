"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
  refreshToken: null,  
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.tokens.access.token
      state.refreshToken = action.payload.tokens.refresh.token 
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    register: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken 
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    setrefreshToken: (state, action) => {
      state.token = action.payload.tokens.access.token
      state.refreshToken = action.payload.tokens.refresh.token  || state.refreshToken
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { 
  login, 
  register, 
  logout, 
  setLoading, 
  setError, 
  setrefreshToken, 
  clearAuth 
} = authSlice.actions

export default authSlice.reducer