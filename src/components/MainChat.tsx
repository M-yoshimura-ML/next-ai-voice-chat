import React from 'react';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { Conversation }  from '../models/commons';

const dummy_messages = [
    {"role": "user", "message": "Hello!"},
    {"role": "AI", "message": "Hello! How can I help you?"},
    {"role": "user", "message": "I have a question about my order."},
    {"role": "AI", "message": "Sure! What would you like to know?"},
    {"role": "user", "message": "Can you provide me with the tracking number?"},
]


interface MainChatProps {
    conversations: Conversation[];
    selectedIndex: number;
  }

const MainChat: React.FC<MainChatProps> = ({
    conversations,
    selectedIndex
}) => {
    const [messages, setMessages] = React.useState(dummy_messages);
    const [inputValue, setInputValue] = React.useState('');
    const sendMessage = () => {
        if (inputValue.trim() === '') return; // Prevent sending empty messages
        setMessages((prev) => [...prev, {role: 'user', message: inputValue}]);
        const newMessage = inputValue;
        getAIResponse(newMessage); // Call AI response function
        setInputValue('');
    }

    const getAIResponse = (message: string) => {
        // Simulate AI response for now
        const aiResponse = `AI response to: ${message}`; // Replace with actual AI logic
        setMessages((prev) => [...prev, {role: 'AI', message: aiResponse}]);
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
    const handleUnmuteClick = () => {
        // Handle unmute input logic here
        console.log("Unmute input clicked");
    }
    const handleShuffleClick = () => {
        // Handle shuffle input logic here
        console.log("Shuffle input clicked");
    }
    const handleRepeatClick = () => {
        // Handle repeat input logic here
        console.log("Repeat input clicked");
    }
    const handleLoopClick = () => {
        // Handle loop input logic here
        console.log("Loop input clicked");
    }
    const handlePlaylistClick = () => {
        // Handle playlist input logic here
        console.log("Playlist input clicked");
    }
    const handleQueueClick = () => {
        // Handle queue input logic here
        console.log("Queue input clicked");
    }
    const handleFavoriteClick = () => {
        // Handle favorite input logic here
        console.log("Favorite input clicked");
    }
    const handleShareClick = () => {
        // Handle share input logic here
        console.log("Share input clicked");
    }
    const handleSaveClick = () => {
        // Handle save input logic here
        console.log("Save input clicked");
    }
    const handleDownloadClick = () => {
        // Handle download input logic here
        console.log("Download input clicked");
    }
    const handleUploadClick = () => {
        // Handle upload input logic here
        console.log("Upload input clicked");
    }

    return (
        <main className="flex-1 flex flex-col bg-white">
            <div className="p-6 overflow-y-auto flex-1">
            <h1 className="text-2xl font-semibold mb-4">{conversations[selectedIndex]?.title}</h1>
            {/* Display Chat Content */}
            <div className="space-y-4 mx-8">
                {messages.map((msg, index) => (
                    <div key={index} className={`text-${msg.role === 'user' ? 'right' : 'left'}`}>
                        <p className={`bg-${msg.role === 'user' ? 'blue-100' : 'gray-100'} inline-block p-3 rounded`}>
                            {msg.message}
                        </p>
                        {msg.role === 'AI' && <button className="text-sm text-blue-500 mt-1">🔊 Play</button>}
                    </div>
                ))}
            </div>
            </div>

            {/* Input area（audio or text） */}
            <div className="p-4 border-t flex items-center space-x-2 m-8">
                <input 
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