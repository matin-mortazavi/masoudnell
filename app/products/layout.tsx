import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Parkour Gear",
  description: "Premium parkour clothes and shoes for athletes",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
