"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { Tutorial, DifficultyLevel } from "@/types/database";
import { Clock, Play, ChevronRight } from "lucide-react";

interface TutorialListItemProps {
  tutorial: Tutorial;
  index: number;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function TutorialListItem({
  tutorial,
  index,
}: TutorialListItemProps) {
  return (
    <ViewTransition name={`tutorial-card-${tutorial.id}`}>
      <Link href={`/tutorials/${tutorial.slug}`} className="group block">
        <article className="flex gap-4 sm:gap-6 bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
          {/* Image */}
          <div className="relative w-32 sm:w-48 h-24 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <ViewTransition name={`tutorial-image-${tutorial.id}`} >
              <img
                src={tutorial.image_url}
                alt={tutorial.title}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover transition-transform rounded-sm duration-500 group-hover:scale-110"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://picsum.photos/seed/${tutorial.id}/800/450`;
                }}
              />
            </ViewTransition>
            {tutorial.video_url && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500/90 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              {/* Badge & Duration */}
              <div className="flex items-center gap-3 mb-2">
                <ViewTransition name={`tutorial-badge-${tutorial.id}`}>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                      difficultyColors[tutorial.difficulty_level]
                    }`}
                  >
                    {tutorial.difficulty_level}
                  </span>
                </ViewTransition>
                {tutorial.duration_minutes && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tutorial.duration_minutes} min</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <ViewTransition name={`tutorial-title-${tutorial.id}`}>
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">
                  {tutorial.title}
                </h3>
              </ViewTransition>

              {/* Description */}
              <ViewTransition name={`tutorial-description-${tutorial.id}`}>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {tutorial.description}
                </p>
              </ViewTransition>
            </div>

            {/* Action */}
            <div className="flex items-center justify-end mt-2">
              <span className="text-orange-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ViewTransition>
  );
}
