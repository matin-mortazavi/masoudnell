"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { Product, ProductCategory } from "@/types/database";
import { MessageCircle, Percent } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

const categoryColors: Record<ProductCategory, string> = {
  clothes: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shoes: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  accessories: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const categoryIcons: Record<ProductCategory, string> = {
  clothes: "👕",
  shoes: "👟",
  accessories: "🎒",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

function getDiscountedPrice(price: number, discount: number): number {
  return price - (price * discount) / 100;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = hasDiscount
    ? getDiscountedPrice(product.price, product.discount_percentage)
    : product.price;
  const mainImage =
    product.images?.[0] || `https://picsum.photos/seed/${product.id}/600/600`;

  return (
    <ViewTransition name={`product-card-${product.id}`}>
      <Link
        href={`/products/${product.slug}`}
        className="group block cursor-pointer"
      >
        <article className="relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <ViewTransition name={`product-image-${product.id}`}>
              <img
                src={mainImage}
                alt={product.title_fa}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://picsum.photos/seed/${product.id}/600/600`;
                }}
              />
            </ViewTransition>

            {/* Stock Status */}
            {!product.in_stock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-lg">ناموجود</span>
              </div>
            )}

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  {product.discount_percentage}%
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <ViewTransition name={`product-badge-${product.id}`}>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize flex items-center gap-1 ${
                    categoryColors[product.category]
                  }`}
                >
                  <span>{categoryIcons[product.category]}</span>
                  {product.category === "clothes"
                    ? "لباس"
                    : product.category === "shoes"
                    ? "کفش"
                    : "اکسسوری"}
                </span>
              </ViewTransition>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <ViewTransition name={`product-title-${product.id}`}>
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                {product.title_fa}
              </h3>
            </ViewTransition>

            <ViewTransition name={`product-description-${product.id}`}>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {product.description_fa}
              </p>
            </ViewTransition>

            {/* Price & Order */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-xl font-bold text-orange-400">
                  {formatPrice(finalPrice)}
                </span>
              </div>
              <span className="text-orange-400 text-sm font-medium group-hover:underline flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                سفارش
              </span>
            </div>

            {/* Sizes Preview */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="px-2 py-0.5 text-gray-500 text-xs">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </article>
      </Link>
    </ViewTransition>
  );
}
