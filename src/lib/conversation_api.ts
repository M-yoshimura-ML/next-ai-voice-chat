interface ConversationRequestBody {
    user_id: string;
    title: string | null;
    messages: {
        role: string;
        content: string;
        translated_content: string | null;
        audio_url: string | null;
    }[];
}


export const createConversationAndMessages = async (payload: ConversationRequestBody) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
};

export const getUserConversations = async (user_id: string) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-conversations?user_id=${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    return await response.json();
};
  