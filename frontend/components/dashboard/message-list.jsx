"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import authService from "services/authService";
import { useSelector } from "react-redux";
import chatService from "services/chatService";

export function MessageList() {
  const token = useSelector((state) => state.auth.token);
  const [searchQuery, setSearchQuery] = useState("");
  const [allInvitedUser, setAllInvitedUser] = useState([]);

  const filteredConversations = useMemo(() => {
    return allInvitedUser.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allInvitedUser, searchQuery]);

  useEffect(() => {
    const getALlUserData = async () => {
      const responseData = await authService.getallUsers(token);
      console.log("responseData", responseData);
      setAllInvitedUser(responseData?.data?.users || []);
    };

    getALlUserData();
  }, []);

  const handleViewConverstion = async (userId) => {
    const responseData = await chatService.accessChat(userId, token);
    console.log("responseData", responseData);
  };

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
        {filteredConversations?.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => handleViewConverstion(conversation._id)}
            className={`flex cursor-pointer items-center gap-3 border-b p-4 bg-gray-100 hover:bg-muted/50 `}
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
                <p className="text-xs text-muted-foreground">
                  {conversation.createdAt}
                </p>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.message}
              </p>
            </div>
            {conversation.unread && (
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
