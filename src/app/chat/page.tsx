'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const [messages, setMessages] = useState<{ role: string; context: string}[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        setMessages([...messages, { role: 'user', context: input }]);
        setInput('');
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="p-4 shadow text-xl font-semibold bg-blue-600 text-white">AI Chat</header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                            <strong>{message.role === 'user' ? 'You' : 'AI'}</strong>: {message.context}
                        </div>
                    </div>
                ))}
            </main>

            <footer className="p-4 bg-gray-100 flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
            </footer>
        </div>
    )
}
