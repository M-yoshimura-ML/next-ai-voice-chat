import { fetchJson } from "@/lib/api";
import { ApiResponse, SignupPayload, LoginPayload, LoginResponseData } from '../models/commons';

export async function signupUser(payload: SignupPayload): Promise<ApiResponse> {
  return await fetchJson("/auth/signup", {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
  return await fetchJson("/auth/login", {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function refreshToken(): Promise<ApiResponse<LoginResponseData>> {
  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";
  return await fetchJson("/auth/refresh-token", {
    method: 'POST',
    headers: {
      'Authorization': `${tokenType} ${token}`,
  },
  });
}