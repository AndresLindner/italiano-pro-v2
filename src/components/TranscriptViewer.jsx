import React, { useRef, useEffect } from 'react';

export default function TranscriptViewer({ transcript, currentTime, onSeek }) {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  // Find the currently active line
  const activeIndex = transcript.findIndex((entry, index) => {
    const nextEntry = transcript[index + 1];
    const startTime = entry.start;
    const endTime = nextEntry ? nextEntry.start : entry.start + entry.duration;
    return currentTime >= startTime && currentTime < endTime;
  });

  // Auto-scroll to active line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeLineRef.current;
      
      // Calculate position to center the active line in the container
      const offsetTop = element.offsetTop;
      const containerHalfHeight = container.clientHeight / 2;
      
      container.scrollTo({
        top: offsetTop - containerHalfHeight,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto pr-2 rounded space-y-2 relative scroll-smooth"
    >
      {transcript.map((entry, index) => {
        const isActive = index === activeIndex;
        return (
          <div 
            key={index}
            ref={isActive ? activeLineRef : null}
            onClick={() => onSeek(entry.start)}
            className={`p-3 rounded cursor-pointer transition-all duration-200 border-l-4 ${
              isActive 
                ? 'bg-indigo-600/30 border-indigo-400 shadow-lg scale-[1.02] transform' 
                : 'border-transparent bg-gray-800/20 hover:bg-gray-800/60'
            }`}
          >
            <div className="flex gap-3 items-start">
              <span className={`text-xs font-mono shrink-0 mt-1 ${isActive ? 'text-indigo-300' : 'text-gray-400'}`}>
                [{formatTime(entry.start)}]
              </span>
              <p className={`text-sm md:text-base leading-relaxed ${isActive ? 'text-white font-bold' : 'text-gray-200 font-medium'}`}>
                {entry.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
