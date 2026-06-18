import React, { useState } from 'react';
import { shadowingVideos } from '../data/transcripts';
import InteractiveVideoPlayer from './InteractiveVideoPlayer';
import TranscriptViewer from './TranscriptViewer';

export default function ShadowingTab() {
  const [selectedVideoId, setSelectedVideoId] = useState(shadowingVideos[0].id);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerRef, setPlayerRef] = useState(null);

  const selectedVideo = shadowingVideos.find(v => v.id === selectedVideoId);

  const handleSeek = (time) => {
    if (playerRef) {
      playerRef.seekTo(time);
      playerRef.playVideo();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      <div className="p-4 border-b border-white/10 shrink-0">
        <h2 className="text-xl font-bold mb-4 text-indigo-400">Pratica di Shadowing</h2>
        <div className="flex gap-4 items-center">
          <label className="text-sm text-gray-300">Seleziona Video:</label>
          <select 
            className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 w-full max-w-md"
            value={selectedVideoId}
            onChange={(e) => setSelectedVideoId(e.target.value)}
          >
            {shadowingVideos.map(video => (
              <option key={video.id} value={video.id}>
                {video.title}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Ascolta il video e ripeti ad alta voce. Usa i controlli per rallentare o tornare indietro.
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
          <InteractiveVideoPlayer 
            videoId={selectedVideoId} 
            onTimeUpdate={setCurrentTime} 
            onReady={setPlayerRef} 
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col min-h-0 bg-gray-900/50">
          <TranscriptViewer 
            transcript={selectedVideo.transcript} 
            currentTime={currentTime} 
            onSeek={handleSeek} 
          />
        </div>
      </div>
    </div>
  );
}
