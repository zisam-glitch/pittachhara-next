'use client';

import { useState, useRef, useEffect } from 'react';
import { useVideo } from '../context/VideoContext';

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    description?: string;
    src: string;
    thumb: string;
  };
  className?: string;
  showDetails?: boolean;
  height?: string;
}

export function VideoPlayer({ video, className = '', showDetails = true, height = 'h-full' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { activeVideoId, setActiveVideo } = useVideo();
  const isActive = activeVideoId === video.id;

  // Handle video state changes when active video changes
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive && !isFullPlaying) {
      // This video is now active but not yet playing
      setShowControls(true);
    } else if (!isActive) {
      // Another video is active, pause and reset this one
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setShowControls(false);
      setIsFullPlaying(false);
    }
  }, [isActive, isFullPlaying]);

  // Start preview on hover
  const handleMouseEnter = () => {
    if (videoRef.current && !isFullPlaying && !isActive) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(error => console.error('Preview play error:', error));
    }
  };

  // Pause preview when leaving
  const handleMouseLeave = () => {
    if (videoRef.current && !isFullPlaying && !isActive) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Toggle full playback with audio and show controls
  const handleClick = () => {
    if (!videoRef.current) return;

    if (!isFullPlaying) {
      // Set this video as active, which will pause others through the context
      setActiveVideo(video.id);
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      videoRef.current.play()
        .then(() => {
          setShowControls(true);
          setIsFullPlaying(true);
        })
        .catch(error => {
          console.error('Error playing video:', error);
          setActiveVideo(null);
        });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setShowControls(false);
      setIsFullPlaying(false);
      setActiveVideo(null);
    }
  };

  return (
    <div className={`${showDetails ? 'space-y-2' : ''} ${className}`}>
      <div
        className="relative group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
      <video
        ref={videoRef}
        className={`w-full  object-cover overflow-hidden shadow-lg transition-opacity ${height}`}
        poster={video.thumb}
        controls={showControls}
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!showControls && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="">
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5_2)">
                <path
                  d="M39.0784 18.5084L2.41164 0.174994C1.895 -0.0816468 1.28328 -0.0550062 0.791641 0.248353C0.3 0.553353 0 1.08835 0 1.66663V38.3333C0 38.9116 0.3 39.4466 0.791641 39.7516C1.05828 39.9166 1.36164 40 1.66664 40C1.92164 40 2.17664 39.9416 2.41164 39.825L39.0783 21.4916C39.6434 21.2084 40 20.6316 40 20C40 19.3684 39.6434 18.7916 39.0784 18.5084Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_2">
                  <rect width={40} height={40} fill="white" />
                </clipPath>
              </defs>
            </svg>


          </div>
        </div>
        )}
      </div>
      
      {showDetails && (
        <div className="px-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{video.title}</h3>
          {video.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
