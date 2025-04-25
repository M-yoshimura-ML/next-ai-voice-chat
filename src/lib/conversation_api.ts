import { MessageBase } from "@/models/commons";

interface ConversationRequestBody {
    userId: string;
    title: string | null;
    messages: MessageBase[];
}

interface SaveMessagesRequestBody {
    conversationId: string;
    messages: MessageBase[];
}

export const createConversationAndMessages = async (payload: ConversationRequestBody) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
};

export const getUserConversations = async (user_id: string) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-conversations?user_id=${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    return await response.json();
};


export const getMessages = async (conversation_id: string) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation-messages?conversation_id=${conversation_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    return await response.json();
};

export const saveMessages = async (payload: SaveMessagesRequestBody) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/save-messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
};