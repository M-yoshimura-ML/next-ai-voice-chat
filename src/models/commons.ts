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
    audioUrl: string | null;
    translatedContent: string | null;
}

export interface Message extends MessageBase {
    id: string;
    conversationId: string;
    createdAt: string;
}

export interface chatPayload {
    message: string;
    history: MessageBase[] | [];
    language: string;
}

export interface translatePayload {
    text: string;
    target_language: string;
}