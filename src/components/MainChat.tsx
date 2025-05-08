import React, { useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { createConversationAndMessages, saveMessages } from '@/lib/conversation_api';
import { chatWithText, translate, textChat } from '@/lib/openai_api';
import { ttsWithAudioUrl } from '@/lib/tts_api';
import { ApiResponse, MessageBase, Message } from '../models/commons';
import AudioPlayer from './UI/AudioPlayer';


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
    const [isLoading, setIsLoading] = React.useState(false);
    const [showTranslations, setShowTranslations] = React.useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        if (messageList.length > 0) {
            setMessages(messageList);
        }
    }, [messageList]);

    const sendMessage = async() => {
        if (inputValue.trim() === '') return;
        let history: MessageBase[] = [];
        if (messages.length >= 0) {
            //history = messages.slice(messages.length - 5, messages.length);
            history = [...messages];
        }
        setMessages((prev) => [...prev, {role: 'user', content: inputValue, audioUrl: null, translatedContent: null}]);
        const newMessage = inputValue;
        setInputValue('');
        setIsLoading(true);
        //const aiResponse = await getAIResponse(newMessage, history);
        const aiAnswer = await getTextResponse(newMessage, history);
        setIsLoading(false);

        const messageRequest = [
            {
              role: "user",
              content: inputValue,
              translatedContent: null,
              audioUrl: null
            },
            aiAnswer
            // {
            //   role: "assistant",
            //   content: aiResponse.content,
            //   translatedContent: aiResponse.translatedContent,
            //   audioUrl: aiResponse.audioUrl
            // }
        ]

        if (!conversationId) {
            // Create a new conversation and messages
            const currentUserId = localStorage.getItem("user_id");
            if (!currentUserId) return;
            const response = await createConversationAndMessages({
              userId: currentUserId,
              title: null,
              messages: messageRequest
            });
          
            const newConversationId = response.data?.conversationId;
            router.push(`/chat2/${newConversationId}`);
        } else {
            // Save messages to the existing conversation
            const saveMessagesResponse = await saveMessages({
                conversationId: conversationId,
                messages: messageRequest
            });
            if (saveMessagesResponse.status !== 200) {
                console.error("Error saving messages:", saveMessagesResponse.message);
            }
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

        const tranalateResponse = await translate({text:aiAnswer, target_language: 'ja'});
        const translatedText = tranalateResponse?.data ?? null;

        const ttsResponse = await ttsWithAudioUrl({text:aiAnswer, language:'en' });
        const audioUrl = ttsResponse?.data?.audio_url ?? null;

        setMessages((prev) => [...prev, {role: 'assistant', content: aiAnswer, audioUrl: audioUrl, translatedContent: translatedText}]);
        return {role: 'assistant', content: aiAnswer, audioUrl: audioUrl, translatedContent: translatedText};
    }

    const getTextResponse = async(message: string, history: MessageBase[]) => {
        const chatPayload = {
            message: message,
            history: history,
            language: 'en'
        }
        const aiResponse: ApiResponse<MessageBase> = await textChat(chatPayload);
        let aiAnswer = aiResponse?.data;
        if (aiAnswer) {
            setMessages((prev) => [...prev, aiAnswer]);
            // Simulate AI response delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            setMessages((prev) => [...prev, {role: 'assistant', content: "Sorry, I can't help you with that.", audioUrl: null, translatedContent: null}]);
            return {role: 'assistant', content: "Sorry, I can't help you with that.", audioUrl: null, translatedContent: null};
        }
        
        return aiAnswer;
    }

    const toggleTranslation = (index: number) => {
        setShowTranslations((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return (
        <main className="flex-1 flex flex-col bg-white">
            <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-4 mx-8">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <p className={`bg-${msg.role === 'user' ? 'blue-100' : 'gray-100'} inline-block p-3 rounded shadow max-w-md`}>
                            {msg.role === "assistant" && msg.translatedContent && showTranslations[index]
                                ? msg.translatedContent
                                : msg.content}
                        </p>
                        {msg.role === 'assistant' && msg.audioUrl && (
                            <AudioPlayer audioUrl={msg.audioUrl} />
                        )}
                        {msg.role === "assistant" && msg.translatedContent && (
                            <BsTranslate
                                className="text-gray-500 cursor-pointer mx-2 mt-1"
                                size={24}
                                onClick={() => toggleTranslation(index)}
                                title="Toggle translation"
                            />
                        )}
                    </div>
                ))}
                {isLoading && ( 
                    <div className="flex justify-center items-center mt-4">
                        <img src="/Spinner-5.gif" alt="Loading..." className="w-12 h-12 animate-spin" />
                    </div>
                )}
            </div>
            </div>

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
            </div>
        </main>
    )
}

export default MainChat