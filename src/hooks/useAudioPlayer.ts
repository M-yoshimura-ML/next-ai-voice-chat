import { useState } from "react";

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const playAudio = async (url: string) => {
    setIsPlaying(false);
    setError(null);

    try {
      const audio = new Audio(url);
      await audio.play();
      setIsPlaying(true);

      audio.onended = () => setIsPlaying(false);
    } catch (err) {
      console.error("Audio playback failed:", err);
      setError(err as Error);
    }
  };

  return {
    playAudio,
    isPlaying,
    error,
  };
}
