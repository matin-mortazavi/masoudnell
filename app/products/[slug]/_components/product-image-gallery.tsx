"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import { ProductCategory } from "@/types/database";
import { ChevronLeft, ChevronRight, Percent } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  productId: string;
  inStock: boolean;
  category: ProductCategory;
  categoryLabel: string;
  categoryColor: string;
  discountPercentage: number;
}

export default function ProductImageGallery({
  images,
  title,
  productId,
  inStock,
  category,
  categoryLabel,
  categoryColor,
  discountPercentage,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList =
    images?.length > 0
      ? images
      : [`https://picsum.photos/seed/${productId}/800/800`];

  const hasDiscount = discountPercentage > 0;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <ViewTransition name={`product-image-${productId}`}>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-800">
          <img
            src={imageList[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).src = `https://picsum.photos/seed/${productId}/800/800`;
            }}
          />

          {/* Stock Badge */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">ناموجود</span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-red-500 text-white flex items-center gap-1">
                <Percent className="w-4 h-4" />
                {discountPercentage}%
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${categoryColor}`}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Navigation Arrows */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {imageList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
              {currentIndex + 1} / {imageList.length}
            </div>
          )}
        </div>
      </ViewTransition>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                index === currentIndex
                  ? "border-orange-500"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <img
                src={image}
                alt={`${title} - thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://picsum.photos/seed/${productId}-${index}/200/200`;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
