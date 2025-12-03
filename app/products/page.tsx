import Link from "next/link";
import { getProducts } from "@/lib/products";
import { Product, ProductCategory } from "@/types/database";
import ProductsGrid from "./_components/products-grid";

export const metadata = {
  title: "Products | Parkour Gear",
  description:
    "Premium parkour clothes and shoes. Order via Telegram for the best parkour equipment.",
};

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

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
    if (products.length === 0) {
      products = [];
    }
  } catch {
    products = [];
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
            برگشت به خانه
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
            محصولات پارکور
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            لباس و کفش‌های مخصوص پارکور با کیفیت بالا. برای سفارش از طریق تلگرام
            پیام دهید.
          </p>

          {/* Order Info Banner */}
          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <div>
                <p className="text-orange-400 font-medium">
                  نحوه سفارش: پیام در تلگرام
                </p>
                <p className="text-gray-400 text-sm">
                  برای سفارش هر محصول، روی آن کلیک کنید و از طریق لینک تلگرام
                  پیام دهید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          <span className="text-gray-500 text-sm self-center mr-2">
            فیلتر بر اساس دسته‌بندی:
          </span>
          {(["clothes", "shoes", "accessories"] as ProductCategory[]).map(
            (category) => (
              <span
                key={category}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[category]}`}
              >
                {categoryLabels[category]}
              </span>
            )
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏃</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                به زودی محصولات جدید
              </h2>
              <p className="text-gray-400">
                محصولات پارکور به زودی در این بخش قرار می‌گیرند.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
