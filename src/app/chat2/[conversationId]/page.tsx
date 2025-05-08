'use client';

import React from "react";
import { useParams } from "next/navigation";
import ChatPage2 from "../page";

const ConversationPage: React.FC = () => {
  const params = useParams();
  const conversationId = params.conversationId as string; // Get conversationId from URL params

  return (
    <ChatPage2 conversationId={conversationId} />
  );
};

export default ConversationPage;