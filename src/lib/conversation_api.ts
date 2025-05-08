import { fetchJson } from "@/lib/api";
import { ApiResponse, Message, Conversation, ConversationRequestBody, SaveMessagesRequestBody, SaveConversationResponse } from "@/models/commons";


export async function createConversationAndMessages(payload: ConversationRequestBody): Promise<ApiResponse<SaveConversationResponse>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson("/history/save", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}


export async function getUserConversations(): Promise<ApiResponse<Conversation[]>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson(`/history/user-conversations`, {
        method: 'GET',
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}


export async function getMessages(conversation_id: string): Promise<ApiResponse<Message[]>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson(`/history/conversation-messages?conversation_id=${conversation_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}


export async function saveMessages(payload: SaveMessagesRequestBody): Promise<ApiResponse> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson("/history/save-messages", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}