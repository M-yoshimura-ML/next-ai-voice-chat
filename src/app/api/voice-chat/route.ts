import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const audioFile = formData.get("audio_file");

    const authorizationHeader = req.headers.get("Authorization");
    const token = authorizationHeader?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token not provided" }, { status: 401 });
    }

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/voice-chat`, {
        method: "POST",
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': authorizationHeader,
        },
        body: formData,
    });

    // Return AI Audio and text response
    const aiAudio = await backendRes.blob();
    const headers = new Headers({
        "Content-Type": "audio/mpeg",
        "X-Reply-Text": backendRes.headers.get("X-Reply-Text") || "",
    });

    return new Response(aiAudio, { headers });
}
