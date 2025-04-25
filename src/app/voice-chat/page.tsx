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

      // 🎯 APIに送信
      const formData = new FormData();
      formData.append("audio_file", audioBlob, "voice.webm");
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

      // テキストと音声ファイルを受け取る（X-Reply-Text付き）
      const audioBlobResponse = await res.blob();
      const replyText = res.headers.get("X-Reply-Text") || "No reply";

      setResponseText(replyText);
      setAudioUrl(URL.createObjectURL(audioBlobResponse));
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

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
