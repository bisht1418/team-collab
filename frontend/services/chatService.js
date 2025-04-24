import baseService from "./baseService";
import { store } from "../redux/store";
import { io } from "socket.io-client";
import {
  fetchChatsSuccess,
  setActiveChat,
  setMessages,
  addMessage,
  updateMessage,
  setTyping,
  stopTyping,
  setUserStatus,
  setLoading,
  setError,
  clearError,
  markMessageRead,
} from "../redux/features/chatSlice";

export let socket;
const initializeSocket = (token) => {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_API_URL || "https://team-collab-1.onrender.com", {
    auth: { token },
  });

  socket.on("connected", () => {
    console.log("Socket connected");
    socket.emit("setup");
    socket.emit("user online");
  });

  socket.on("message received", (newMessage) => {
    store.dispatch(addMessage(newMessage));
  });

  socket.on("typing", (roomId) => {
    store.dispatch(setTyping(roomId));
  });

  socket.on("stop typing", (roomId) => {
    store.dispatch(stopTyping(roomId));
  });

  socket.on("user status", ({ userId, status }) => {
    store.dispatch(setUserStatus({ userId, status }));
  });

  socket.on("message read", ({ messageId, userId }) => {
    store.dispatch(markMessageRead({ messageId, userId }));
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
    store.dispatch(setError("Connection error. Please try again."));
  });

  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

const handleError = (error) => {
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";
  store.dispatch(setError(message));
  return { success: false, message };
};

const chatService = {
  setupSocket: (token) => {
    try {
      initializeSocket(token);
      return { success: true };
    } catch (error) {
      return handleError(error);
    }
  },

  fetchChats: async (token) => {
    try {
      store.dispatch(setLoading(true));
      const response = await baseService.get("/chats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      store.dispatch(fetchChatsSuccess(response.data));
      return { success: true, chats: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  accessChat: async (userId, token) => {
    try {
      store.dispatch(setLoading(true));
      const response = await baseService.post("/chats", { userId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      const chat = response.data;

      if (socket) {
        socket.emit("join chat", chat._id);
      }

      store.dispatch(setActiveChat(chat));

      // Fetch messages for this chat right after accessing it
      await chatService.fetchMessages(chat._id, token);

      return { success: true, chat };
    } catch (error) {
      return handleError(error);
    }
  },

  createGroupChat: async (name, users, token) => {
    try {
      store.dispatch(setLoading(true));
      const response = await baseService.post("/chats/group", {
        name,
        users: JSON.stringify(users),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (socket) {
        socket.emit("join chat", response.data._id);
      }

      return { success: true, chat: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  renameGroup: async (chatId, chatName, token) => {
    try {
      const response = await baseService.put("/chats/rename", {
        chatId,
        chatName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, chat: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  addToGroup: async (chatId, userId, token) => {
    try {
      const response = await baseService.put("/chats/groupadd", {
        chatId,
        userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, chat: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  removeFromGroup: async (chatId, userId, token) => {
    try {
      const response = await baseService.put("/chats/groupremove", {
        chatId,
        userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, chat: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  sendMessage: async (content, chatId, token) => {
    try {
      const response = await baseService.post("/messages", {
        content,
        chatId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (socket && response.data) {
        socket.emit("new message", response.data);
      }

      return { success: true, message: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  fetchMessages: async (chatId, token) => {
    try {
      store.dispatch(setLoading(true));
      const response = await baseService.get(`/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Dispatch messages to Redux store
      store.dispatch(setMessages(response.data));

      return { success: true, messages: response.data };
    } catch (error) {
      return handleError(error);
    }
  },

  markAsRead: async (messageId, token) => {
    try {
      await baseService.put(`/messages/${messageId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { activeChat } = store.getState().chat;

      if (socket && activeChat) {
        socket.emit("mark read", { chatId: activeChat._id, messageId });
      }

      return { success: true };
    } catch (error) {
      return handleError(error);
    }
  },

  deleteMessage: async (messageId, token) => {
    try {
      await baseService.delete(`/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true };
    } catch (error) {
      return handleError(error);
    }
  },

  sendTyping: (chatId) => {
    if (socket) {
      socket.emit("typing", chatId);
    }
  },

  sendStopTyping: (chatId) => {
    if (socket) {
      socket.emit("stop typing", chatId);
    }
  },

  cleanup: () => {
    disconnectSocket();
  },
};

export default chatService;