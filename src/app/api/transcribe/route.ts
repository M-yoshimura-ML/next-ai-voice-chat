import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const authorizationHeader = req.headers.get("Authorization");
    const token = authorizationHeader?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token not provided" }, { status: 401 });
    }

    try {
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transcribe`, {
          method: "POST",
          headers: {
            'Authorization': authorizationHeader,
          },
          body: formData,
        });
    
        // バックエンドからの成功レスポンスをJSONとして取得
        const resJson = await backendRes.json();
        return NextResponse.json(resJson);
    
    } catch (error) {
        console.error("Error fetching from backend:", error);
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
    }
}
