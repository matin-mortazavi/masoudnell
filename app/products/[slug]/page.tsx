import { notFound } from "next/navigation";
import Link from "next/link";
import { ViewTransition } from "react";
import { getProductBySlug, getProducts } from "@/lib/products";
import { ProductCategory } from "@/types/database";
import {
  MessageCircle,
  ArrowRight,
  Package,
  Palette,
  Percent,
} from "lucide-react";
import ProductImageGallery from "./_components/product-image-gallery";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}

function getDiscountedPrice(price: number, discount: number): number {
  return price - (price * discount) / 100;
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title_fa} | Parkour Gear`,
    description: product.description_fa,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const telegramLink = `https://t.me/${product.telegram_username}`;
  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = hasDiscount
    ? getDiscountedPrice(product.price, product.discount_percentage)
    : product.price;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-8"
          >
            <ArrowRight className="w-5 h-5" />
            برگشت به محصولات
          </Link>
        </div>
      </header>

      {/* Product Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="relative">
              <div className="sticky top-24">
                <ProductImageGallery
                  images={product.images}
                  title={product.title_fa}
                  productId={product.id}
                  inStock={product.in_stock}
                  category={product.category}
                  categoryLabel={categoryLabels[product.category]}
                  categoryColor={categoryColors[product.category]}
                  discountPercentage={product.discount_percentage}
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <ViewTransition name={`product-title-${product.id}`}>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {product.title_fa}
                </h1>
              </ViewTransition>
              <p className="text-gray-500 text-lg mb-4">{product.title_en}</p>

              <ViewTransition name={`product-description-${product.id}`}>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {product.description_fa}
                </p>
              </ViewTransition>

              {/* Price */}
              <div className="mb-8 rtl">
                {hasDiscount && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-gray-500 line-through">
                       {formatPrice(product.price)}
                    </span>
                    <span className="px-2 py-1 rounded-full text-sm font-bold bg-green-100 text-green-500 flex items-center gap-1">
                      {product.discount_percentage}% تخفیف
                    </span>
                  </div>
                )}
                <div className="flex gap-1 text-3xl font-bold text-orange-400">
                  <span>تومان</span>
                  <span className="text-3xl font-bold text-orange-400">
                    {formatPrice(finalPrice)}
                  </span>
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-400" />
                    سایزهای موجود
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors cursor-default"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-orange-400" />
                    رنگ‌های موجود
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors cursor-default"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Section */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">نحوه سفارش</h3>
                <p className="text-gray-400 mb-6">
                  برای سفارش این محصول، از طریق تلگرام پیام دهید. سایز و رنگ
                  مورد نظر خود را اعلام کنید.
                </p>

                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    product.in_stock
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle className="w-6 h-6" />
                  {product.in_stock ? "سفارش در تلگرام" : "ناموجود"}
                </a>

                <p className="text-gray-500 text-sm mt-4 text-center">
                  @{product.telegram_username}
                </p>
              </div>

              {/* Info Notice */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-400 text-sm">
                  💡 قیمت‌ها و موجودی ممکن است تغییر کند. برای اطلاع از آخرین
                  قیمت با ما در تلگرام در ارتباط باشید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
