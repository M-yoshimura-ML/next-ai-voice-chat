// components/Sidebar.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Conversation } from '../models/commons'

interface SidebarProps {
  conversations: Conversation[];
  onNewConversation: () => void;
  onSelectConversation: (index: number) => void;
  selectedIndex: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  onNewConversation,
  onSelectConversation,
  selectedIndex,
}) => {
  const router = useRouter();
  const handleSelectedConversation = (id: string) => {
    router.push(`/chat2/${id}`); 
  }

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <button
        onClick={onNewConversation}
        className="mb-4 bg-blue-600 w-full py-2 rounded"
      >
        + New Chat
      </button>
      <ul>
        {conversations.map((conversation, index) => (
          <li
            key={index}
            className={`mb-2 cursor-pointer p-2 rounded hover:bg-gray-800 ${
              selectedIndex === index ? "bg-gray-800" : ""
            }`}
            onClick={() => handleSelectedConversation(conversation.id.toString())}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
