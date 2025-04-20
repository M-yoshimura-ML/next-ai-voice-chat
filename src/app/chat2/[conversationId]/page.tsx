'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatPage2 from "../page";

const ConversationPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  const [messages, setMessages] = useState<string[]>([]); // Placeholder for messages
  const [newMessage, setNewMessage] = useState("");

  // Get messages from local storage or API based on conversationId
  // Pass messages to the ChatPage2 component

  return (
    <ChatPage2 />
  );
};

export default ConversationPage;