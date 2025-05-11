import { fetchJson, fetchJsonWithAuth } from "@/lib/api";
import { ApiResponse, UserSettings } from "@/models/commons";

export async function getUserPreferences(): Promise<ApiResponse<UserSettings>> {
  return await fetchJsonWithAuth("/user/get-settings", {
    method: "GET",
  });
}

export async function updateUserPreferences(payload: UserSettings): Promise<ApiResponse> {
  return await fetchJsonWithAuth("/user/update-settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
