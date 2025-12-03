"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { Product, ProductCategory } from "@/types/database";
import { MessageCircle, Percent } from "lucide-react";

interface ProductListItemProps {
  product: Product;
  index: number;
}

const categoryColors: Record<ProductCategory, string> = {
  clothes: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shoes: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  accessories: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const categoryLabels: Record<ProductCategory, string> = {
  clothes: "لباس",
  shoes: "کفش",
  accessories: "اکسسوری",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

function getDiscountedPrice(price: number, discount: number): number {
  return price - (price * discount) / 100;
}

export default function ProductListItem({
  product,
  index,
}: ProductListItemProps) {
  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = hasDiscount
    ? getDiscountedPrice(product.price, product.discount_percentage)
    : product.price;
  const mainImage =
    product.images?.[0] || `https://picsum.photos/seed/${product.id}/400/400`;

  return (
    <ViewTransition name={`product-card-${product.id}`}>
      <Link
        href={`/products/${product.slug}`}
        className="group block cursor-pointer"
      >
        <article className="relative bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
              <ViewTransition name={`product-image-${product.id}`}>
                <img
                  src={mainImage}
                  alt={product.title_fa}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (
                      e.target as HTMLImageElement
                    ).src = `https://picsum.photos/seed/${product.id}/400/400`;
                  }}
                />
              </ViewTransition>

              {/* Stock Status */}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold">ناموجود</span>
                </div>
              )}

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    {product.discount_percentage}%
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <ViewTransition name={`product-title-${product.id}`}>
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {product.title_fa}
                    </h3>
                  </ViewTransition>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ml-3 shrink-0 ${
                      categoryColors[product.category]
                    }`}
                  >
                    {categoryLabels[product.category]}
                  </span>
                </div>

                <ViewTransition name={`product-description-${product.id}`}>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {product.description_fa}
                  </p>
                </ViewTransition>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Order */}
              <div className="flex items-center justify-between mt-auto">
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
                  سفارش در تلگرام
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </ViewTransition>
  );
}
