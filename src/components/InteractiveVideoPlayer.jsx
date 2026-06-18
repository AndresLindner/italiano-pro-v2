import React, { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Gauge, RotateCcw, RotateCw, ChevronsLeft, ChevronsRight, Play, Pause } from 'lucide-react';

export default function InteractiveVideoPlayer({ videoId, onTimeUpdate, onReady }) {
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          onTimeUpdate(playerRef.current.getCurrentTime());
        }
      }, 100); // Check every 100ms for smooth highlighting
    }
    return () => clearInterval(interval);
  }, [isPlaying, onTimeUpdate]);

  const handleReady = (event) => {
    playerRef.current = event.target;
    onReady(event.target);
  };

  const handleStateChange = (event) => {
    // 1 is playing, 2 is paused, 0 is ended
    setIsPlaying(event.data === 1);
    if (event.data !== 1 && playerRef.current) {
      onTimeUpdate(playerRef.current.getCurrentTime());
    }
  };

  const seekBy = (seconds) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime + seconds));
    }
  };

  const rewind = (seconds) => seekBy(-seconds);

  const togglePlay = () => {
    if (playerRef.current) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) { // 1 is playing
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const changeSpeed = () => {
    if (playerRef.current) {
      const newRate = playbackRate === 1 ? 0.75 : playbackRate === 0.75 ? 0.5 : 1;
      playerRef.current.setPlaybackRate(newRate);
      setPlaybackRate(newRate);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'u':
          e.preventDefault();
          seekBy(-5);
          break;
        case 'y':
          e.preventDefault();
          seekBy(-10);
          break;
        case 'o':
          e.preventDefault();
          seekBy(5);
          break;
        case 'p':
          e.preventDefault();
          seekBy(10);
          break;
        case 'i':
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg shrink-0">
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={handleReady} 
          onStateChange={handleStateChange}
          className="w-full h-full"
          iframeClassName="w-full h-full"
        />
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 md:gap-3 justify-center">
        <button 
          onClick={() => seekBy(-10)}
          className="flex items-center gap-1 md:gap-2 bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded shadow transition-colors"
          title="Indietro 10 secondi (y)"
        >
          <ChevronsLeft size={18} />
          <span className="text-xs md:text-sm font-semibold">-10s</span>
        </button>

        <button 
          onClick={() => seekBy(-5)}
          className="flex items-center gap-1 md:gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded shadow transition-colors"
          title="Indietro 5 secondi (u)"
        >
          <RotateCcw size={18} />
          <span className="text-xs md:text-sm font-semibold">-5s</span>
        </button>

        <button 
          onClick={togglePlay}
          className="flex items-center gap-1 md:gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded shadow transition-colors"
          title="Play/Pausa (i)"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button 
          onClick={() => seekBy(5)}
          className="flex items-center gap-1 md:gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded shadow transition-colors"
          title="Avanti 5 secondi (o)"
        >
          <RotateCw size={18} />
          <span className="text-xs md:text-sm font-semibold">+5s</span>
        </button>

        <button 
          onClick={() => seekBy(10)}
          className="flex items-center gap-1 md:gap-2 bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded shadow transition-colors"
          title="Avanti 10 secondi (p)"
        >
          <ChevronsRight size={18} />
          <span className="text-xs md:text-sm font-semibold">+10s</span>
        </button>

        <button 
          onClick={changeSpeed}
          className="flex items-center gap-1 md:gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded shadow transition-colors sm:ml-auto"
          title="Cambia velocità"
        >
          <Gauge size={18} />
          <span className="text-xs md:text-sm font-semibold">{playbackRate}x</span>
        </button>
      </div>
    </div>
  );
}
