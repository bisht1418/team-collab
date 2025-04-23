"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Search,
  Smile,
  Paperclip,
  Send,
  ImageIcon,
  User,
  UserPlus,
  Edit,
  Users,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import chatService from "../../services/chatService";
import { format } from "date-fns";
import  {addMessage}  from "../../redux/features/chatSlice";

export function MessageView() {
  const token = useSelector((state) => state.auth.token);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    activeChat,
    messages,
    isTyping: someoneTyping,
    userStatuses,
  } = useSelector((state) => state.chat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeChat?.isGroupChat) {
      setNewGroupName(activeChat.chatName);
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && activeChat) {
      chatService.sendStopTyping(activeChat._id);

      const result = await chatService.sendMessage(
        newMessage.trim(),
        activeChat._id,
        token
      );
      if (result.success) {
        dispatch(addMessage(result.message));
        setNewMessage("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = () => {
    if (!isTyping && activeChat) {
      setIsTyping(true);
      chatService.sendTyping(activeChat._id);
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      setIsTyping(false);
      chatService.sendStopTyping(activeChat._id);
    }, 3000);

    setTypingTimeout(timeout);
  };

  const handleRenameGroup = async () => {
    if (newGroupName.trim() && activeChat) {
      const result = await chatService.renameGroup(
        activeChat._id,
        newGroupName
      );
      if (result.success) {
        setShowEditGroup(false);
        dispatch({ type: "chat/updateChat", payload: result.chat });
      }
    }
  };

  const getChatInfo = () => {
    if (!activeChat) return { name: "", avatar: "" };

    if (activeChat.isGroupChat) {
      return {
        name: activeChat.chatName,
        avatar: `/placeholder.svg?height=48&width=48&text=GC`,
      };
    } else {
      const otherUser = activeChat.users.find((u) => u._id !== user?._id);
      const name = otherUser?.name || "Chat";
      const avatarText = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      return {
        name,
        avatar:
          otherUser?.avatar ||
          `/placeholder.svg?height=48&width=48&text=${avatarText}`,
        isOnline: userStatuses[otherUser?._id] === "online",
      };
    }
  };

  const groupMessagesByDate = () => {
    const groups = {};

    messages.forEach((message) => {
      const date = new Date(message.createdAt);
      const dateKey = format(date, "dd MMMM yyyy");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(message);
    });

    return groups;
  };

  const chatInfo = getChatInfo();
  const messageGroups = groupMessagesByDate();

  if (!activeChat) {
    return (
      <div className="flex flex-col flex-1 bg-white border-l items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-muted rounded-full p-6 inline-block mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">
            Choose a conversation from the list or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white border-l">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <img
              src={chatInfo.avatar}
              alt={chatInfo.name}
              className="h-full w-full object-cover"
            />
            {chatInfo.isOnline && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-medium">{chatInfo.name}</h2>
            <p className="text-sm text-muted-foreground">
              {activeChat.isGroupChat
                ? `${activeChat.users.length} members`
                : chatInfo.isOnline
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted">
            <Search className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-muted"
              onClick={() => setShowActions(!showActions)}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {/* Dropdown menu */}
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                {activeChat.isGroupChat ? (
                  <>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                      onClick={() => {
                        setShowGroupInfo(true);
                        setShowActions(false);
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Group Info
                    </button>
                    {activeChat.groupAdmin?._id === user?._id && (
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                        onClick={() => {
                          setShowEditGroup(true);
                          setShowActions(false);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Group
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                    onClick={() => {
                      // User profile action would go here
                      setShowActions(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Group Info Modal */}
      {showGroupInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Group Info</h3>
              <button
                onClick={() => setShowGroupInfo(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="h-20 w-20 rounded-full overflow-hidden mb-2">
                <img
                  src={chatInfo.avatar}
                  alt={chatInfo.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="text-lg font-medium">{chatInfo.name}</h4>
              <p className="text-sm text-muted-foreground">
                Created by {activeChat.groupAdmin?.name || "Unknown"}
              </p>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium mb-2">
                Members ({activeChat.users.length})
              </h5>
              <div className="space-y-2">
                {activeChat.users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={
                            user.avatar ||
                            `/placeholder.svg?height=32&width=32&text=${user.name?.charAt(
                              0
                            )}`
                          }
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{user.name}</span>
                    </div>
                    {user._id === activeChat.groupAdmin?._id && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Group</h3>
              <button
                onClick={() => setShowEditGroup(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Group Name
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleRenameGroup}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center mb-4">
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {date}
              </span>
            </div>

            <div className="space-y-4">
              {dateMessages.map((message) => {
                const isSentByMe = message.sender._id === user?._id;
                const messageTime = new Date(message.createdAt);
                const formattedTime = format(messageTime, "hh:mm a");

                return (
                  <div
                    key={message._id}
                    className={`flex ${
                      isSentByMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSentByMe && (
                      <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={
                            message.sender.avatar ||
                            `/placeholder.svg?height=32&width=32&text=${message.sender.name?.charAt(
                              0
                            )}`
                          }
                          alt={message.sender.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isSentByMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {activeChat.isGroupChat && !isSentByMe && (
                        <p className="text-xs font-medium mb-1">
                          {message.sender.name}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <div className="mt-1 text-right text-xs opacity-70 flex justify-end items-center gap-1">
                        {formattedTime}
                        {isSentByMe && message.readBy?.length > 0 && (
                          <span className="text-xs">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {someoneTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 max-w-[70%]">
              <div className="flex gap-1">
                <span className="animate-bounce">•</span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  •
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  •
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input bar */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </button>
          <input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
