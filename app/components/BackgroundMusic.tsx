'use client';

import { useEffect, useRef, useState } from 'react';

interface BackgroundMusicProps {
  audioSrc?: string;
}

export default function BackgroundMusic({ audioSrc = '/audio/background-music.mp3' }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const playAudio = async () => {
    if (!audioRef.current) return;

    try {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (err) {
      console.log('Autoplay was prevented:', err);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    // Add muted autoplay first to work around browser restrictions
    if (audioRef.current) {
      audioRef.current.muted = true;
      const mutedPromise = audioRef.current.play();
      
      if (mutedPromise !== undefined) {
        mutedPromise
          .then(() => {
            // If muted autoplay works, unmute and play
            if (audioRef.current) {
              audioRef.current.muted = false;
              setIsPlaying(true);
            }
          })
          .catch(() => {
            // If muted autoplay is blocked, show message
            setShowMessage(true);
          });
      }
    }

    // Set up click handler for browsers that block autoplay
    const handleFirstInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await playAudio();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setShowMessage(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
     
      <audio
        ref={audioRef}
        loop
        src={audioSrc}
        className="hidden"
        preload="auto"
      />
     
    </div>
  );
}
