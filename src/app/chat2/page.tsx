// pages/chat.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import MainChat from "@/components/MainChat";
import { Conversation, Message } from "@/models/commons";
import { getUserConversations, getMessages } from "@/lib/conversation_api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BiSidebar } from "react-icons/bi";

export interface ChatPageProps {
  conversationId: string | null;
}

const ChatPage2: React.FC<ChatPageProps> = ({conversationId}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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


  return (
    <ProtectedRoute>
      <div className="flex h-screen container mx-auto">
        {/*Sidebar Toggle Button*/}
        <button
          className="fixed top-2 left-4 z-50 p-2 bg-blue-600 text-white rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}  
        > 
          <BiSidebar size={24} />
        </button>
        {isSidebarOpen && (
          <div className={`fixed left-0 z-50 lg:relative lg:z-0 lg:block`}>
            <Sidebar
              conversations={conversations}
              onNewConversation={handleNewConversation}
            />
          </div>
        )}
        

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
