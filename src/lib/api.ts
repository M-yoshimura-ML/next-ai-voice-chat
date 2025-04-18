export interface SignupPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface ApiResponse<T = unknown> {
    status: number;
    message: string | null;
    data: T | null;
  }
  
  export async function signupUser(payload: SignupPayload): Promise<ApiResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    return {
      status: data.status,
      message: data.message,
      data: data.data,
    };
  }
  