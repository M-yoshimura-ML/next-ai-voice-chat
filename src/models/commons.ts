export interface ApiResponse<T = unknown> {
    status: number;
    message: string | null;
    data: T | null;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
  
export interface LoginResponseData {
    user_id: string;
}

export interface mfaPayload {
    user_id: string;
    otp_code: string;
}

export interface mfaResponseData {
    access_token: string;
    token_type: string;
}

export interface Conversation {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
}

export interface ConversationRequestBody {
    userId: string;
    title: string | null;
    messages: MessageBase[];
}

export interface SaveMessagesRequestBody {
    conversationId: string;
    messages: MessageBase[];
}

export interface SaveConversationResponse{
    conversationId: string;
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

export interface UserSettings {
    language: string;
    textModel: string;
    speechModel: string;
    transcribeModel: string;
    useHistory: boolean;
    promptTemplate: string;
}