// hooks/useVoiceRecorder.ts
import { useState, useRef } from "react";
import { useAudioPlayer } from "./useAudioPlayer";

export function useVoiceRecorder({
  onUserInput,
  onResponse,
  onAudioUrl,
  onLoadingChange,
}: {
  onUserInput: (text: string) => void;
  onResponse: (text: string) => void;
  onAudioUrl: (url: string) => void;
  onLoadingChange: (loading: boolean) => void;
}) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { playAudio } = useAudioPlayer();

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
      formData.append("language", "en");

      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const transcribeResult = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (transcribeResult.ok) {
        try {
          const responseJson = await transcribeResult.json();
          onUserInput(responseJson.data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      const res = await fetch("/api/voice-chat", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });

      const audioBlobResponse = await res.blob();
      const base64Text = res.headers.get("X-Reply-Text");
      const replyText = base64Text ? decodeBase64ToUtf8(base64Text) : "No reply";

      onResponse(replyText);
      const audioUrl = URL.createObjectURL(audioBlobResponse);
      onAudioUrl(audioUrl);
      onLoadingChange(false);

    //   const audio = new Audio(audioUrl);
    //   try {
    //     await audio.play();
    //   } catch (err) {
    //     console.error("Auto-play failed:", err);
    //   }
      await playAudio(audioUrl);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    onLoadingChange(true);
  };

  return {
    startRecording,
    stopRecording,
    recording,
  };
}

function decodeBase64ToUtf8(base64String: string): string {
  const decodedBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
  return new TextDecoder().decode(decodedBytes);
}
