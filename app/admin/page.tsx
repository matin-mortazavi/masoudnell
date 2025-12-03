import Link from "next/link";
import { getProducts } from "@/lib/products";
import { Package, Plus, Edit, Trash2 } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-orange-500" />
              <h1 className="text-xl font-bold">پنل مدیریت</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                مشاهده سایت
              </Link>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                محصول جدید
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">کل محصولات</p>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">موجود</p>
            <p className="text-3xl font-bold text-green-400">
              {products.filter((p) => p.in_stock).length}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">ناموجود</p>
            <p className="text-3xl font-bold text-red-400">
              {products.filter((p) => !p.in_stock).length}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">محصولات</h2>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">هنوز محصولی اضافه نشده است.</p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                اولین محصول را اضافه کنید
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      تصویر
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      نام محصول
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      دسته‌بندی
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      قیمت
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      تخفیف
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      وضعیت
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <img
                          src={
                            product.images?.[0] ||
                            `https://picsum.photos/seed/${product.id}/100/100`
                          }
                          alt={product.title_fa}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">
                            {product.title_fa}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.title_en}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                          {product.category === "clothes"
                            ? "لباس"
                            : product.category === "shoes"
                            ? "کفش"
                            : "اکسسوری"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        {product.discount_percentage > 0 ? (
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
                            {product.discount_percentage}%
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {product.in_stock ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            موجود
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            ناموجود
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
