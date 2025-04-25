import React, { useRef, useState } from 'react';
import { RxSpeakerLoud } from "react-icons/rx";
import { TbPlayerPauseFilled } from "react-icons/tb";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={togglePlay} className="text-sm text-blue-500 mt-1">
        {isPlaying ? <TbPlayerPauseFilled size={24} /> : <RxSpeakerLoud size={24} /> }
      </button>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        preload="auto"
      />
    </div>
  );
};

export default AudioPlayer;
