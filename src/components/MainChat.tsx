import React, { useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { createConversationAndMessages } from '@/lib/conversation_api';
import { chatWithText } from '@/lib/openai_api';
import { ApiResponse, MessageBase, Message } from '../models/commons';


interface MainChatProps {
    conversationId: string | null;
    messageList: Message[] | [];
}

const MainChat: React.FC<MainChatProps> = ({
    conversationId,
    messageList,
}) => {
    const [messages, setMessages] = React.useState<(MessageBase | Message)[]>(messageList);
    const [inputValue, setInputValue] = React.useState('');
    const router = useRouter();
    const [isRecording, setIsRecording] = React.useState(false);

    useEffect(() => {
        if (messageList.length > 0) {
            setMessages(messageList);
        }
    }
    , [messageList]);

    const sendMessage = async() => {
        if (inputValue.trim() === '') return;
        let history: MessageBase[] = [];
        if (messages.length >= 0) {
            //history = messages.slice(messages.length - 5, messages.length);
            history = [...messages];
        }
        setMessages((prev) => [...prev, {role: 'user', content: inputValue}]);
        const newMessage = inputValue;
        const aiResponse = await getAIResponse(newMessage, history);
        setInputValue('');

        if (!conversationId) {
            // Create a new conversation and messages
            const currentUserId = localStorage.getItem("user_id");
            if (!currentUserId) return;
            const response = await createConversationAndMessages({
              user_id: currentUserId,
              title: null,
              messages: [
                {
                  role: "user",
                  content: inputValue,
                  translated_content: null,
                  audio_url: null
                },
                {
                  role: "assistant",
                  content: aiResponse.content,
                  translated_content: null, // ToDo: Add translation logic if needed
                  audio_url: null // ToDo: Get audio URL from aiResponse
                }
              ]
            });
          
            const newConversationId = response.data.conversation_id;
            router.push(`/chat2/${newConversationId}`);
        }
    }

    const getAIResponse = async(message: string, history: MessageBase[]) => {
        const chatPayload = {
            message: message,
            history: history, 
            language: 'en',
        }
        const aiResponse: ApiResponse<string> = await chatWithText(chatPayload); 
        let aiAnswer = aiResponse?.data ?? "Sorry, I can't help you with that.";

        // if (aiAnswer) {
        //     // Simulate AI response delay
        //     await new Promise(resolve => setTimeout(resolve, 1000));
        // }
        setMessages((prev) => [...prev, {role: 'assistant', content: aiAnswer}]);
        return {role: 'assistant', content: aiAnswer};
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleAudioClick = () => {
        // Handle audio input logic here
        console.log("Audio input clicked");
    }
    const handleTextClick = () => {
        // Handle text input logic here
        console.log("Text input clicked");
    }
    const handleVoiceClick = () => {
        // Handle voice input logic here
        console.log("Voice input clicked");
    }
    const handleRecordClick = () => {
        // Handle record input logic here
        console.log("Record input clicked");
    }
    const handlePlayClick = () => {
        // Handle play input logic here
        console.log("Play input clicked");
    }
    const handleStopClick = () => {
        // Handle stop input logic here
        console.log("Stop input clicked");
    }
    const handlePauseClick = () => {
        // Handle pause input logic here
        console.log("Pause input clicked");
    }
    const handleResumeClick = () => {
        // Handle resume input logic here
        console.log("Resume input clicked");
    }
    const handleSkipClick = () => {
        // Handle skip input logic here
        console.log("Skip input clicked");
    }
    const handleRewindClick = () => {
        // Handle rewind input logic here
        console.log("Rewind input clicked");
    }
    const handleFastForwardClick = () => {
        // Handle fast forward input logic here
        console.log("Fast forward input clicked");
    }
    const handleVolumeClick = () => {
        // Handle volume input logic here
        console.log("Volume input clicked");
    }
    const handleMuteClick = () => {
        // Handle mute input logic here
        console.log("Mute input clicked");
    }

    return (
        <main className="flex-1 flex flex-col bg-white">
            <div className="p-6 overflow-y-auto flex-1">
            {/* Display Chat Content */}
            <div className="space-y-4 mx-8">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <p className={`bg-${msg.role === 'user' ? 'blue-100' : 'gray-100'} inline-block p-3 rounded shadow max-w-md`}>
                            {msg.content}
                        </p>
                        {msg.role === 'assistant' && <button className="text-sm text-blue-500 mt-1">🔊 Play</button>}
                    </div>
                ))}
            </div>
            </div>

            {/* Input area（audio or text） */}
            <div className="p-4 border-t flex items-center space-x-2 m-8">
                <input 
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type="text" 
                    placeholder="Talk or input text..." 
                    className="flex-1 border rounded px-4 py-2" />
                <IoMdSend 
                    onClick={() => {
                        sendMessage();
                    }}
                    className="text-gray-500 cursor-pointer" size={24} />
                <FaMicrophone className="text-gray-500 cursor-pointer" size={24} />
                {/* <button className="p-2 bg-red-500 text-white rounded-full">🗣</button>
                <button className="p-2 bg-green-500 text-white rounded-full">🎤</button>
                <button className="p-2 bg-blue-500 text-white rounded-full">🎙</button> */}
            </div>
        </main>
    )
}

export default MainChat