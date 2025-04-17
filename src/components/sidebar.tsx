// components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  conversations: string[];
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
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <button
        onClick={onNewConversation}
        className="mb-4 bg-blue-600 w-full py-2 rounded"
      >
        + New Chat
      </button>
      <ul>
        {conversations.map((title, index) => (
          <li
            key={index}
            className={`mb-2 cursor-pointer p-2 rounded hover:bg-gray-800 ${
              selectedIndex === index ? "bg-gray-800" : ""
            }`}
            onClick={() => onSelectConversation(index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
