"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product, ProductCategory } from "@/types/database";
import { Plus, X, Upload, Loader2, ImagePlus } from "lucide-react";
import {
  createProductAction,
  updateProductAction,
  uploadImageAction,
} from "../actions";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [titleEn, setTitleEn] = useState(product?.title_en || "");
  const [titleFa, setTitleFa] = useState(product?.title_fa || "");
  const [descriptionEn, setDescriptionEn] = useState(
    product?.description_en || ""
  );
  const [descriptionFa, setDescriptionFa] = useState(
    product?.description_fa || ""
  );
  const [category, setCategory] = useState<ProductCategory>(
    product?.category || "clothes"
  );
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [discountPercentage, setDiscountPercentage] = useState(
    product?.discount_percentage?.toString() || "0"
  );
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [newSize, setNewSize] = useState("");
  const [colors, setColors] = useState<string[]>(product?.colors || []);
  const [newColor, setNewColor] = useState("");
  const [telegramUsername, setTelegramUsername] = useState(
    product?.telegram_username || "masoudnell"
  );
  const [inStock, setInStock] = useState(product?.in_stock ?? true);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError(null);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          setError("فقط فایل‌های تصویری مجاز هستند");
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError("حجم فایل نباید بیشتر از ۵ مگابایت باشد");
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadImageAction(formData);

        if (result.success && result.url) {
          setImages((prev) => [...prev, result.url!]);
        } else {
          setError(result.error || "خطا در آپلود تصویر");
        }
      }
    } catch (err) {
      setError("خطا در آپلود تصویر");
    } finally {
      setUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        title_en: titleEn,
        title_fa: titleFa,
        description_en: descriptionEn,
        description_fa: descriptionFa,
        category,
        price: parseFloat(price) || 0,
        discount_percentage: parseFloat(discountPercentage) || 0,
        images,
        slug: generateSlug(titleEn),
        sizes,
        colors,
        telegram_username: telegramUsername,
        in_stock: inStock,
      };

      let result;
      if (isEditing && product) {
        result = await updateProductAction(product.id, productData);
      } else {
        result = await createProductAction(productData);
      }

      if (!result.success) {
        setError(result.error || "خطا در ذخیره محصول");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ذخیره محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {/* Title Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">عنوان محصول</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              عنوان فارسی *
            </label>
            <input
              type="text"
              value={titleFa}
              onChange={(e) => setTitleFa(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="مثال: تیشرت پارکور Pro"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="e.g. Parkour Pro T-Shirt"
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">توضیحات محصول</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              توضیحات فارسی *
            </label>
            <textarea
              value={descriptionFa}
              onChange={(e) => setDescriptionFa(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              placeholder="توضیحات محصول به فارسی..."
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Description (English) *
            </label>
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              placeholder="Product description in English..."
            />
          </div>
        </div>
      </div>

      {/* Category & Price Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">دسته‌بندی و قیمت</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              دسته‌بندی *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="clothes">لباس</option>
              <option value="shoes">کفش</option>
              <option value="accessories">اکسسوری</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              قیمت (تومان) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="450000"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              درصد تخفیف
            </label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              min="0"
              max="100"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">تصاویر محصول</h2>

        {/* Upload Image */}
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              uploadingImage
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-700 hover:border-orange-500 hover:bg-gray-800"
            }`}
          >
            {uploadingImage ? (
              <>
                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                <span className="text-orange-400">در حال آپلود...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-6 h-6 text-gray-400" />
                <span className="text-gray-400">
                  برای آپلود تصویر کلیک کنید یا فایل را بکشید
                </span>
              </>
            )}
          </label>
          <p className="text-xs text-gray-500 mt-2 text-center">
            فرمت‌های مجاز: JPG, PNG, WebP - حداکثر ۵ مگابایت
          </p>
        </div>

        {/* Image List */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 group"
              >
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">
                    اصلی
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !uploadingImage && (
          <div className="text-center py-4 text-gray-500">
            <p>هنوز تصویری آپلود نشده است</p>
          </div>
        )}
      </div>

      {/* Sizes & Colors Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">سایز و رنگ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sizes */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">سایزها</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="مثال: XL"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSize())
                }
              />
              <button
                type="button"
                onClick={addSize}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded-lg"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">رنگ‌ها</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="مثال: مشکی"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addColor())
                }
              />
              <button
                type="button"
                onClick={addColor}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded-lg"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telegram & Stock Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">تنظیمات سفارش</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              نام کاربری تلگرام *
            </label>
            <div className="flex">
              <span className="px-4 py-3 bg-gray-700 border border-r-0 border-gray-700 rounded-r-lg text-gray-400">
                @
              </span>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="masoudnell"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              وضعیت موجودی
            </label>
            <div className="flex items-center gap-4 h-[50px]">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={inStock}
                  onChange={() => setInStock(true)}
                  className="sr-only peer"
                />
                <span className="px-4 py-2 rounded-lg border transition-colors peer-checked:bg-green-500/20 peer-checked:border-green-500 peer-checked:text-green-400 border-gray-700 text-gray-400">
                  موجود
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={!inStock}
                  onChange={() => setInStock(false)}
                  className="sr-only peer"
                />
                <span className="px-4 py-2 rounded-lg border transition-colors peer-checked:bg-red-500/20 peer-checked:border-red-500 peer-checked:text-red-400 border-gray-700 text-gray-400">
                  ناموجود
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <Link
          href="/admin"
          className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
        >
          انصراف
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white rounded-xl font-medium transition-colors"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isEditing ? "ذخیره تغییرات" : "افزودن محصول"}
        </button>
      </div>
    </form>
  );
}
