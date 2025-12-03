import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductForm from "../_components/product-form";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            برگشت به پنل مدیریت
          </Link>
          <h1 className="text-2xl font-bold mt-4">افزودن محصول جدید</h1>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm />
      </div>
    </main>
  );
}
