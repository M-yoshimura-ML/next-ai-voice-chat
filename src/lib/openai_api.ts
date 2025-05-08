import { fetchJson } from "@/lib/api";
import { ApiResponse, chatPayload, translatePayload, MessageBase } from '../models/commons';


export async function chatWithText(payload: chatPayload): Promise<ApiResponse<string>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson("/openai/chat", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}


export async function translate(payload: translatePayload): Promise<ApiResponse<string>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson("/openai/translate", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}


export async function textChat(payload: chatPayload): Promise<ApiResponse<MessageBase>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    return await fetchJson("/openai/text-chat", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `${tokenType} ${token}`,
        },
    });
}