// pages/chat.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import MainChat from "@/components/MainChat";
import { Conversation, Message } from "@/models/commons";
import { getUserConversations, getMessages } from "@/lib/conversation_api";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export interface ChatPageProps {
  conversationId: string | null;
}

const ChatPage2: React.FC<ChatPageProps> = ({conversationId}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const fetchConversations = async () => {
    const user_id = localStorage.getItem("user_id");
    let fetchedConversations: Conversation[] = [];
    if (user_id) {
      const result = await getUserConversations();
      fetchedConversations = result.data ? result.data : [];
    }
    setConversations(fetchedConversations);
  }

  const fetchMessages = async (conversationId: string) => {
    let fetchedMessages: Message[] = [];
    const result = await getMessages(conversationId);
    if (result.status === 200) {
      fetchedMessages = result.data ? result.data : [];
    } else {
      console.error("Error fetching messages:", result.message);
    }
    setMessages(fetchedMessages);
  }

  useEffect(() => {
    setLoading(true);
    fetchConversations();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId]);

  const handleNewConversation = () => {
    router.push("/chat2")
  };

  const handleSelectConversation = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <ProtectedRoute>
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
          messageList={messages}
        />
      </div>
    </ProtectedRoute>
  );
};


export default ChatPage2;
