import { ApiResponse } from '../models/commons';

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
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


export interface LoginPayload {
    email: string;
    password: string;
}
  
export interface LoginResponseData {
    access_token: string;
    token_type: string;
}
  
export async function loginUser(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
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
  