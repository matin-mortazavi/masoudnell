"use client";

import { ViewTransition } from "react";
import { Tutorial, DifficultyLevel } from "@/types/database";
import { Clock, Play, BookOpen } from "lucide-react";
import TutorialVideo from "./tutorial-video";
import TutorialImage from "./tutorial-image";
import BackButton from "./back-button";

interface TutorialDetailContentProps {
  tutorial: Tutorial;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const difficultyDescriptions: Record<DifficultyLevel, string> = {
  beginner: "Perfect for those just starting out",
  intermediate: "Some prior knowledge recommended",
  advanced: "For experienced developers",
};

export default function TutorialDetailContent({
  tutorial,
}: TutorialDetailContentProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <ViewTransition name={`tutorial-image-${tutorial.id}`}>
          <div className="absolute inset-0 h-[60vh]">
            <TutorialImage
              src={tutorial.image_url}
              alt={tutorial.title}
              id={tutorial.id}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>
        </ViewTransition>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Back Button */}
          <BackButton />

          {/* Badge */}
          <div className="mb-4">
            <ViewTransition name={`tutorial-badge-${tutorial.id}`}>
              <span
                className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border capitalize ${
                  difficultyColors[tutorial.difficulty_level]
                }`}
              >
                {tutorial.difficulty_level}
              </span>
            </ViewTransition>
          </div>

          {/* Title */}
          <ViewTransition name={`tutorial-title-${tutorial.id}`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {tutorial.title}
            </h1>
          </ViewTransition>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            {tutorial.duration_minutes && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{tutorial.duration_minutes} minutes</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>{difficultyDescriptions[tutorial.difficulty_level]}</span>
            </div>
          </div>

          {/* Description */}
          <ViewTransition name={`tutorial-description-${tutorial.id}`}>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              {tutorial.description}
            </p>
          </ViewTransition>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ViewTransition name={`tutorial-card-${tutorial.id}`}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            {tutorial.video_url ? (
              <TutorialVideo
                videoUrl={tutorial.video_url}
                title={tutorial.title}
              />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-900">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <Play className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Video Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    This tutorial&apos;s video content is currently being
                    prepared.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ViewTransition>

        {/* Additional Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              What You&apos;ll Learn
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Core concepts and fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Practical implementation techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Best practices and optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Prerequisites
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-600 mt-1">•</span>
                <span>Basic HTML/CSS knowledge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600 mt-1">•</span>
                <span>JavaScript fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600 mt-1">•</span>
                <span>Code editor installed</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-orange-400 hover:text-orange-300 text-sm transition-colors"
              >
                📁 Download Source Code
              </a>
              <a
                href="#"
                className="block text-orange-400 hover:text-orange-300 text-sm transition-colors"
              >
                📄 View Documentation
              </a>
              <a
                href="#"
                className="block text-orange-400 hover:text-orange-300 text-sm transition-colors"
              >
                💬 Join Discussion
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
