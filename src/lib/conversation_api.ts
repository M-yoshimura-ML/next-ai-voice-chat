import { fetchJson, fetchJsonWithAuth } from "@/lib/api";
import { ApiResponse, Message, Conversation, ConversationRequestBody, SaveMessagesRequestBody, SaveConversationResponse } from "@/models/commons";


export async function createConversationAndMessages(payload: ConversationRequestBody): Promise<ApiResponse<SaveConversationResponse>> {
    return await fetchJsonWithAuth("/history/save", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}


export async function getUserConversations(): Promise<ApiResponse<Conversation[]>> {
    return await fetchJsonWithAuth(`/history/user-conversations`, {
        method: 'GET',
    });
}


export async function getMessages(conversation_id: string): Promise<ApiResponse<Message[]>> {
    return await fetchJsonWithAuth(`/history/conversation-messages?conversation_id=${conversation_id}`, {
        method: 'GET',
    });
}


export async function saveMessages(payload: SaveMessagesRequestBody): Promise<ApiResponse> {
    return await fetchJsonWithAuth("/history/save-messages", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}