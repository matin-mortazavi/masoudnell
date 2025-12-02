"use client";

interface TutorialImageProps {
  src: string;
  alt: string;
  id: string;
  className?: string;
}

export default function TutorialImage({
  src,
  alt,
  id,
  className = "",
}: TutorialImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="sync"
      className={className}
      onError={(e) => {
        (
          e.target as HTMLImageElement
        ).src = `https://picsum.photos/seed/${id}/1920/1080`;
      }}
    />
  );
}
