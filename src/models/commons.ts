export interface ApiResponse<T = unknown> {
    status: number;
    message: string | null;
    data: T | null;
}

export interface Conversation {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
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
