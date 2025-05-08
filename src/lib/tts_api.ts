import { fetchJsonWithAuth } from "@/lib/api";
import { ApiResponse } from '../models/commons';

interface ttsApiRequest {
    "text": string;
    "language": string;
}

interface ttsApiResponse {
    "audio_url": string;
}


export async function ttsWithAudioUrl(payload: ttsApiRequest): Promise<ApiResponse<ttsApiResponse>> {
    return await fetchJsonWithAuth("/tts/tts-api", {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}