// pages/chat.tsx
'use client';

import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

const ChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<string[]>(["Chat 1"]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNewConversation = () => {
    const newTitle = `Chat ${conversations.length + 1}`;
    setConversations((prev) => [...prev, newTitle]);
    setSelectedIndex(conversations.length); // Switch to the new conversation
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
      <main className="flex-1 flex flex-col bg-white">
        <div className="p-6 overflow-y-auto flex-1">
          <h1 className="text-2xl font-semibold mb-4">
            {conversations[selectedIndex]}
          </h1>
          {/* Display Chat Content */}
          <div className="space-y-4 mx-8">
            <div className="text-right">
              <p className="bg-blue-100 inline-block p-3 rounded">
                Hello!
              </p>
            </div>
            <div className="text-left">
              <p className="bg-gray-100 inline-block p-3 rounded">
                Hello! How can I help you?
              </p>
              <button className="text-sm text-blue-500 mt-1">🔊 Play</button>
            </div>
          </div>
        </div>

        {/* Input area（audio or text） */}
        <div className="p-4 border-t flex items-center space-x-2 m-8">
          <input
            type="text"
            placeholder="Talk or input text..."
            className="flex-1 border rounded px-4 py-2"
          />
          <button className="p-2 bg-blue-500 text-white rounded-full">🎙</button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
