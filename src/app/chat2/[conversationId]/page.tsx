'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import ChatPage2 from "../page";

const ConversationPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  //const conversationId = searchParams.get("conversationId");
  const conversationId = params.conversationId as string; // Get conversationId from URL params

  const [messages, setMessages] = useState<string[]>([]); // Placeholder for messages
  const [newMessage, setNewMessage] = useState("");

  // Get messages from local storage or API based on conversationId
  // Pass messages to the ChatPage2 component

  return (
    <ChatPage2 conversationId={conversationId} />
  );
};

export default ConversationPage;