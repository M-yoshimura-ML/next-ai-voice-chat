export interface ApiResponse<T = unknown> {
    status: number;
    message: string | null;
    data: T | null;
}

export interface Conversation {
    id: number;
    title: string;
    userId: number;
}

export interface Message {
    role: string;
    content: string;
}

export interface chatPayload {
    message: string;
    history: Message[] | [];
    language: string;
}
