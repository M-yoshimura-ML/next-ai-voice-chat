"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Spinner from "@/components/UI/Spiner/SimpleSpiner";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

export default function Recorder() {
  const [responseText, setResponseText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState<string>("");

  const {
    startRecording,
    stopRecording,
    recording,
  } = useVoiceRecorder({
    onUserInput: setUserInput,
    onResponse: setResponseText,
    onAudioUrl: setAudioUrl,
    onLoadingChange: setIsLoading,
  });
  

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-bold mb-4">Voice Chat</div>
        <div className="space-y-4 mx-8">
          {userInput && (
            <div className="justify-end">
              <p className="bg-blue-100 inline-block p-3 rounded shadow max-w-md">
                {userInput}
              </p>
            </div>
          )}

          {isLoading && ( 
            <div className="flex justify-center items-center mt-4">
                <Spinner />
            </div>
          )}

          {responseText && (
            <div className="justify-start">
              <p className="bg-gray-100 inline-block p-3 rounded shadow max-w-md">
              🤖 AI:{responseText}
              </p>
            </div>
          )}

          {audioUrl && (
            <audio className="mt-2" controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          )}

          <div className="flex justify-center items-center mt-4">
            <button
              onClick={recording ? stopRecording : startRecording}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {recording ? "🎙️ Stop" : "🎤 Start Recording"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
