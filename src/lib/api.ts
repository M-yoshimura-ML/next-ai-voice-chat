import { ApiResponse } from '../models/commons';

// This file is used to fetch data from the API. It uses the fetch API to make requests to the API.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing Base URL for API.");
}

export async function fetchJson<T = any>(
  endpoint: string, // not full URL, path only like `/signup`
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { message: 'Invalid JSON response' };
  }

  if (!res.ok) {
    throw {
      status: res.status,
      message: data?.message || 'Something went wrong',
    };
  }

  return {
    status: res.status,
    message: data?.message,
    data: data?.data,
  };
}

export async function fetchJsonWithAuth<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';

  return await fetchJson<T>(endpoint, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Authorization: `${tokenType} ${token}`,
    },
  });
}