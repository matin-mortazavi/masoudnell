import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Learn web development with our comprehensive tutorials",
};

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
