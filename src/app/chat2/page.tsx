// pages/chat.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import MainChat from "@/components/MainChat";
import { Conversation } from "@/models/commons";

const dummyConversations = [
  {id: 1, title: "Chat 1", userId: 1},
  {id: 2, title: "Chat 2", userId: 1},
  {id: 3, title: "Chat 3", userId: 1},
  {id: 4, title: "Chat 4", userId: 1},
  {id: 5, title: "Chat 5", userId: 1},
]

const ChatPage2: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const fetchConversations = async () => {
    // Fetch conversations from the server or local storage
    // For now, we'll use dummy data
    const fetchedConversations = dummyConversations.map((conv:Conversation) => conv);
    setConversations(fetchedConversations);
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleNewConversation = () => {
    // const newTitle = `Chat ${conversations.length + 1}`;
    // setConversations((prev) => [...prev, { id: prev.length + 1, title: newTitle, userId: 1 }]);
    // setSelectedIndex(conversations.length);
    router.push("/chat2")
  };

  const handleSelectConversation = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex h-screen container mx-auto">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
        selectedIndex={selectedIndex}
      />

      {/* Chat Area */}
      <MainChat
        conversations={conversations}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

export default ChatPage2;
