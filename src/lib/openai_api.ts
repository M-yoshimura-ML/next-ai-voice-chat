import { fetchJson, fetchJsonWithAuth } from "@/lib/api";
import { ApiResponse, chatPayload, translatePayload, MessageBase } from '../models/commons';


export async function chatWithText(payload: chatPayload): Promise<ApiResponse<string>> {
    return await fetchJsonWithAuth("/openai/chat", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}


export async function translate(payload: translatePayload): Promise<ApiResponse<string>> {
    return await fetchJsonWithAuth("/openai/translate", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}


export async function textChat(payload: chatPayload): Promise<ApiResponse<MessageBase>> {
    return await fetchJsonWithAuth("/openai/text-chat", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}