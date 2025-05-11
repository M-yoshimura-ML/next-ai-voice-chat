"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserPreferences, updateUserPreferences } from "@/lib/user_api";
import { ApiResponse, UserSettings } from "@/models/commons";

export type Settings = {
  language: "ja" | "en" | "es";
  textModel: "gpt-4" | "gpt-3.5";
  speechModel: "tts-1";
  transcribeModel: "whisper-1";
  useHistory: boolean;
  promptTemplate: string;
};

type SettingsContextType = {
  settings: Settings | UserSettings;
  updateSettings: (updates: Partial<Settings|UserSettings>) => Promise<{ success: boolean; message: string }>;
};

const defaultSettings: Settings = {
  language: "ja",
  textModel: "gpt-4",
  speechModel: "tts-1",
  transcribeModel: "whisper-1",
  useHistory: true,
  promptTemplate: "",
};

const SettingsContext = createContext<SettingsContextType|undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | UserSettings>(defaultSettings);

  useEffect(() => {
    // Get user settings from the server
    const fetchSettings = async () => {
      try {
        const aiResponse: ApiResponse<UserSettings> = await getUserPreferences();
        if (aiResponse.status === 200) {
          const data = aiResponse?.data;
          setSettings({ ...defaultSettings, ...data });
        }
      } catch (err) {
        console.error("Failed to load user settings:", err);
        setSettings({ ...defaultSettings, ...settings });
      }
    };
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings|UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await updateUserPreferences(updated);
      return { success: true, message: "Settings Updated Successfully" };
    } catch (err: any) {
      console.error("Failed to save settings to server:", err);
      return { success: false, message: err?.message || "Failed to save settings" };
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};