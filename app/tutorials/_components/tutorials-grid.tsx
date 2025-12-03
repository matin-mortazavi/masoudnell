"use client";

import { useState, useTransition, ViewTransition } from "react";
import { Tutorial } from "@/types/database";
import TutorialCard from "./tutorial-card";
import TutorialListItem from "./tutorial-list-item";
import { LayoutGrid, List } from "lucide-react";

interface TutorialsGridProps {
  tutorials: Tutorial[];
}

export default function TutorialsGrid({ tutorials }: TutorialsGridProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();

  const handleLayoutChange = (newLayout: "grid" | "list") => {
    startTransition(() => {
      setLayout(newLayout);
    });
  };

  return (
    <>
      {/* Layout Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-500 text-sm mr-2">View:</span>
        <button
          onClick={() => handleLayoutChange("grid")}
          disabled={isPending}
          className={`p-2 rounded-lg transition-colors ${
            layout === "grid"
              ? "bg-orange-500/20 text-orange-400"
              : "bg-gray-800/50 text-gray-400 hover:text-white"
          } ${isPending ? "opacity-50" : ""}`}
          aria-label="Grid view"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleLayoutChange("list")}
          disabled={isPending}
          className={`p-2 rounded-lg transition-colors ${
            layout === "list"
              ? "bg-orange-500/20 text-orange-400"
              : "bg-gray-800/50 text-gray-400 hover:text-white"
          } ${isPending ? "opacity-50" : ""}`}
          aria-label="List view"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Content with ViewTransition */}
      <ViewTransition name="tutorials-layout">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tutorials.map((tutorial, index) => (
              <TutorialListItem
                key={tutorial.id}
                tutorial={tutorial}
                index={index}
              />
            ))}
          </div>
        )}
      </ViewTransition>
    </>
  );
}
