import { ApiResponse, chatPayload, translatePayload } from '../models/commons';

  
export async function chatWithText(payload: chatPayload): Promise<ApiResponse<string>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${tokenType} ${token}`,
        },
        body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    return {
        status: data.status,
        message: data.message,
        data: data.data,
    };
}

export async function translate(payload: translatePayload): Promise<ApiResponse<string>> {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${tokenType} ${token}`,
        },
        body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    return {
        status: data.status,
        message: data.message,
        data: data.data,
    };
}