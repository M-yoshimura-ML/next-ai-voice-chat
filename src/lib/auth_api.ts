import { fetchJson, fetchJsonWithAuth } from "@/lib/api";
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
  return await fetchJsonWithAuth("/auth/refresh-token", {
    method: 'POST',
  });
}