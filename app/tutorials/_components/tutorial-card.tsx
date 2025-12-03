"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { Tutorial, DifficultyLevel } from "@/types/database";
import { Clock, Play } from "lucide-react";

interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function TutorialCard({ tutorial, index }: TutorialCardProps) {
  return (
    <ViewTransition name={`tutorial-card-${tutorial.id}`}>
      <Link
        href={`/tutorials/${tutorial.slug}`}
        className="group block cursor-pointer"
      >
        <article className="relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <ViewTransition name={`tutorial-image-${tutorial.id}`}>
              <img
                src={tutorial.image_url}
                alt={tutorial.title}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://picsum.photos/seed/${tutorial.id}/800/450`;
                }}
              />
            </ViewTransition>

            {/* Play Button Overlay */}
            {tutorial.video_url && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Difficulty Badge */}
            <div className="absolute top-3 right-3">
              <ViewTransition name={`tutorial-badge-${tutorial.id}`}>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${
                    difficultyColors[tutorial.difficulty_level]
                  }`}
                >
                  {tutorial.difficulty_level}
                </span>
              </ViewTransition>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <ViewTransition name={`tutorial-title-${tutorial.id}`}>
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                {tutorial.title}
              </h3>
            </ViewTransition>

            <ViewTransition name={`tutorial-description-${tutorial.id}`}>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {tutorial.description}
              </p>
            </ViewTransition>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {tutorial.duration_minutes && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tutorial.duration_minutes} min</span>
                </div>
              )}
              <span className="text-orange-400 font-medium group-hover:underline">
                Learn more →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ViewTransition>
  );
}
