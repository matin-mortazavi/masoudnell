"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface TutorialVideoProps {
  videoUrl: string;
  title: string;
}

export default function TutorialVideo({ videoUrl, title }: TutorialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Convert YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes("youtube.com/embed")) {
      return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    }
    return url;
  };

  if (!isPlaying) {
    return (
      <div
        className="relative aspect-video bg-gray-900 group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        {/* Thumbnail placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-purple-600/20" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-orange-500/30">
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Click to play text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="text-white/60 text-sm">Click to play video</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black">
      <iframe
        src={getEmbedUrl(videoUrl)}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
