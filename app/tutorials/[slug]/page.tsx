
import { notFound } from "next/navigation";
import { getTutorialBySlug } from "@/lib/tutorials";
import { Tutorial } from "@/types/database";
import TutorialDetailContent from "../_components/tutorial-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let tutorial: Tutorial | null = null;

  try {
    tutorial = await getTutorialBySlug(slug);
    if (!tutorial) {
      tutorial = null;
    }
  } catch {
    tutorial = null;
  }

  if (!tutorial) {
    return { title: "Tutorial Not Found" };
  }

  return {
    title: `${tutorial.title} | Tutorials`,
    description: tutorial.description,
  };
}

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let tutorial: Tutorial | null = null;

  try {
    tutorial = await getTutorialBySlug(slug);
    if (!tutorial) {
      tutorial = null;
    }
  } catch {
    tutorial = null;
  }

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetailContent tutorial={tutorial} />;
}
