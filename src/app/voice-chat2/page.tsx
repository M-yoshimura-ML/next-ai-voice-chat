"use client";

import { useState, useRef, useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Spinner from "@/components/UI/Spiner/SimpleSpiner";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { MessageBase } from "@/models/commons";


export default function Recorder() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageBase[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const {
    startRecording,
    stopRecording,
    recording,
  } = useVoiceRecorder({
    onUserInput: (text: string) => {
        setMessages((prev) => [...prev, { role: "user", content: text, translatedContent: null, audioUrl: null }]);
    },
    onResponse: (text) => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 && msg.role === "user"
            ? msg
            : msg
        ).concat({ role: "assistant", content: text, translatedContent: null, audioUrl: null}) // temp, audioUrl updated later
      );
    },
    onAudioUrl: (url) => {
      // Add audioUrl to the latest assistant message
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant") {
          const updated = { ...last, audioUrl: url };
          return [...prev.slice(0, -1), updated];
        }
        return prev;
      });
    },
    onLoadingChange: setIsLoading,
  });
  

  return (
    <ProtectedRoute>
        <div className="relative flex flex-col items-center justify-between min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <div className="text-2xl font-bold mb-4">Voice Chat</div>
            <div className="w-full max-w-5xl flex-1 overflow-y-auto scroll-smooth  space-y-4 px-4">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`inline-block p-3 rounded shadow max-w-md ${
                                msg.role === "user" ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-800"
                            }`}
                        >
                            <p>{msg.role === "assistant" ? "🤖 " : ""}{msg.content}</p>
                            {msg.audioUrl && (
                                <audio className="mt-2" controls src={msg.audioUrl} />
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && ( 
                    <div className="flex justify-center items-center mt-4">
                        <Spinner />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={recording ? stopRecording : startRecording}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                    {recording ? "🎙️ Stop" : "🎤 Start Recording"}
                </button>
            </div>
        </div>
    </ProtectedRoute>
  );
}
