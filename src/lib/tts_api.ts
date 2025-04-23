import { ApiResponse } from '../models/commons';

interface ttsApiRequest {
    "text": string;
    "language": string;
}

interface ttsApiResponse {
    "audio_url": string;
}

export async function ttsWithAudioUrl(payload: ttsApiRequest) : Promise<ApiResponse<ttsApiResponse>> {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tts-api`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
};