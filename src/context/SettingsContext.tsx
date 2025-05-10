"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Settings = {
  language: "ja" | "en" | "es";
  model: "gpt-4" | "gpt-3.5";
  useHistory: boolean;
  promptTemplate: string;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
  language: "ja",
  model: "gpt-4",
  useHistory: true,
  promptTemplate: "",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Get user settings from the server
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({ ...defaultSettings, ...data });
        }
      } catch (err) {
        console.error("Failed to load user settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await fetch("/api/user/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to save settings to server:", err);
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