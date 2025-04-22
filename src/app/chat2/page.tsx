// pages/chat.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import MainChat from "@/components/MainChat";
import { Conversation } from "@/models/commons";
import { getUserConversations } from "@/lib/conversation_api";

export interface ChatPageProps {
  conversationId: string | null;
}

const ChatPage2: React.FC<ChatPageProps> = ({conversationId}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const fetchConversations = async () => {
    const user_id = localStorage.getItem("user_id");
    let fetchedConversations: Conversation[] = [];
    if (user_id) {
      const result = await getUserConversations(user_id);
      fetchedConversations = result.data
    }
    setConversations(fetchedConversations);
  }

  useEffect(() => {
      fetchConversations();
  }, []);

  const handleNewConversation = () => {
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
        conversationId={conversationId}
      />
    </div>
  );
};

export default ChatPage2;
