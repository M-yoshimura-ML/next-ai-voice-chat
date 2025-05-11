"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { Button } from "@/components/UI/Button/Button";
import { Select } from "@/components/UI/Select/Select";
import { SelectItem } from "@/components/UI/Select/SelectItem";
import { Switch } from "@/components/UI/Switch/Switch";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const languages = [
  { value: "ja", label: "Japanese" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
];

const llmModels = [
  { value: "gpt-4o-mini", label: "GPT-4o-mini" },
  { value: "gpt-4-0613", label: "GPT-4-0613" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo-1106", label: "GPT-3.5" },
];

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (key: any, value: any) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

  const handleSave = async () => {
    try {   
        const result = await updateSettings(localSettings);
        if (result.success) {
            setMessage(result.message);
            setIsSuccess(true);
        } else {
            setMessage(result.message);
            setIsSuccess(false);
        }
    } catch (error) {
        console.error("Error saving settings:", error);
        setMessage("Failed to save settings. Please try again.");
        setIsSuccess(false);
    }
  };

  return (
    <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-[900px] p-4">
                <h1 className="text-2xl font-bold mb-4">User Settings</h1>

                <div className="w-full max-w-[500px] mb-4">
                    <label className="block font-medium">Language</label>
                    <Select
                        value={localSettings.language}
                        onValueChange={(val) => handleChange("language", val )}
                    >
                        {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-2 w-full max-w-[500px] mb-4">
                    <label className="block font-medium">Use History</label>
                    <Switch
                        checked={localSettings.useHistory}
                        onCheckedChange={(checked) => handleChange("useHistory", checked)}
                    />
                </div>

                <div className="w-full max-w-[500px] mb-4">
                    <label className="block font-medium">LLM</label>
                    <Select
                        value={localSettings.textModel}
                        onValueChange={(val) => handleChange("textModel", val )}
                    >
                        {llmModels.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                                {m.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="w-full max-w-[700px] mb-4">
                    <label className="block font-medium">System Prompt (template)</label>
                    <textarea
                        value={localSettings.promptTemplate}
                        onChange={(e) => handleChange("promptTemplate", e.target.value)}
                        rows={6}
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="あなたは親切なアシスタントです。ユーザーの意図を的確にくみ取り、簡潔に回答してください。"
                    />
                </div>
                {message && (
                    <p className={`mt-4 text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <Button onClick={handleSave}>Save Settings</Button>
            </div>
        </div>
    </ProtectedRoute>
  );
}