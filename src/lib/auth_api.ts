import { fetchJson, fetchJsonWithAuth } from "@/lib/api";
import { ApiResponse, SignupPayload, LoginPayload, LoginResponseData, mfaPayload, mfaResponseData } from '../models/commons';

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

export async function mfaUser(payload: mfaPayload): Promise<ApiResponse<mfaResponseData>> {
  return await fetchJson(`/auth/mfa?user_id=${payload.user_id}&otp=${payload.otp_code}`, {
    method: 'POST',
  });
}

export async function refreshToken(): Promise<ApiResponse<mfaResponseData>> {
  return await fetchJsonWithAuth("/auth/refresh-token", {
    method: 'POST',
  });
}