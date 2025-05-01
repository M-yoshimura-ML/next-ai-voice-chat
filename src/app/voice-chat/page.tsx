"use client";

import { useState, useRef } from "react";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      audioChunksRef.current = [];

      const formData = new FormData();
      formData.append("audio_file", audioBlob, "voice.webm");
      formData.append("language", "en"); // Set the language hint
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const res = await fetch("/api/voice-chat", {
        method: "POST",
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `${tokenType} ${token}`,
        },
      });

      // Get text and audio file（X-Reply-Text）
      const audioBlobResponse = await res.blob();
      const base64Text = res.headers.get("X-Reply-Text");
      const replyText = base64Text ? decodeBase64ToUtf8(base64Text) : "No reply";

      setResponseText(replyText);
      const audioUrl = URL.createObjectURL(audioBlobResponse);
      setAudioUrl(audioUrl);

      const audio = new Audio(audioUrl);
      try {
        // Attempt to play the audio automatically (chrome doen't work but Brave does)
        await audio.play();
        console.log('Audio playing automatically!');
      } catch (err) {
        console.error('Failed to auto-play:', err);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  function decodeBase64ToUtf8(base64String: string): string {
    // Decode Base64 and convert to Uint8Array
    const decodedBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    // Interpret as UTF-8 with TextDecoder
    return new TextDecoder().decode(decodedBytes);
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex gap-2">
        <button
          onClick={recording ? stopRecording : startRecording}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {recording ? "🎙️ Stop" : "🎤 Start Recording"}
        </button>
      </div>

      {responseText && <p className="text-lg mt-2">🤖 AI: {responseText}</p>}
      {audioUrl && (
        <audio className="mt-2" controls src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
