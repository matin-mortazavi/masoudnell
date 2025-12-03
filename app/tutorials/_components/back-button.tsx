"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/tutorials"
      className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-8 group"
    >
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      Back to Tutorials
    </Link>
  );
}
