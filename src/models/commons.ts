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

export interface MessageBase {
    role: string;
    content: string;
}

export interface Message extends MessageBase {
    id: string;
    translatedContent: string | null;
    conversationId: string;
    audioUrl: string | null;
    createdAt: string;
}

export interface chatPayload {
    message: string;
    history: MessageBase[] | [];
    language: string;
}
