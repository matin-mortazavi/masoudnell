import Link from "next/link";
import { getTutorials } from "@/lib/tutorials";
import { Tutorial, DifficultyLevel } from "@/types/database";
import TutorialsGrid from "./_components/tutorials-grid";

export const metadata = {
  title: "Tutorials | Learn Web Development",
  description:
    "Browse our collection of tutorials covering GSAP, Three.js, Next.js, and more.",
};

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default async function TutorialsPage() {
  // Try to fetch from Supabase, fallback to mock data
  let tutorials: Tutorial[] = [];

  try {
    tutorials = await getTutorials();
    if (tutorials.length === 0) {
      tutorials = [];
    }
  } catch {
    tutorials = [];
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
            Tutorials
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Master modern web development with our comprehensive tutorials. From
            animations to 3D graphics, we&apos;ve got you covered.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          <span className="text-gray-500 text-sm self-center mr-2">
            Filter by level:
          </span>
          {(["beginner", "intermediate", "advanced"] as DifficultyLevel[]).map(
            (level) => (
              <span
                key={level}
                className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${difficultyColors[level]}`}
              >
                {level}
              </span>
            )
          )}
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <TutorialsGrid tutorials={tutorials} />
        </div>
      </section>
    </main>
  );
}
