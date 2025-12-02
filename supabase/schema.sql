-- Supabase Schema for Masoud Nell
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- STORAGE BUCKET FOR IMAGES
-- ============================================
-- Note: Run this in the Supabase Dashboard -> Storage -> Create Bucket
-- Bucket name: images
-- Public bucket: Yes
-- Or run this SQL:

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images  
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to delete their images
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

-- ============================================
-- TUTORIALS TABLE
-- ============================================
-- Tutorials Table Schema for Supabase

-- Create custom enum for difficulty levels
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty_level difficulty_level NOT NULL DEFAULT 'beginner',
  video_url TEXT,
  image_url TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_tutorials_slug ON tutorials(slug);

-- Create index on difficulty level for filtering
CREATE INDEX idx_tutorials_difficulty ON tutorials(difficulty_level);

-- Create index on created_at for sorting
CREATE INDEX idx_tutorials_created_at ON tutorials(created_at DESC);

-- Enable Row Level Security
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON tutorials
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert (adjust as needed)
CREATE POLICY "Allow authenticated insert" ON tutorials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update (adjust as needed)
CREATE POLICY "Allow authenticated update" ON tutorials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at on row modification
CREATE TRIGGER update_tutorials_updated_at
  BEFORE UPDATE ON tutorials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - uncomment to use)
INSERT INTO tutorials (title, description, difficulty_level, video_url, image_url, slug, duration_minutes) VALUES
  (
    'Getting Started with GSAP Animations',
    'Learn the fundamentals of GSAP (GreenSock Animation Platform) and create stunning web animations. This comprehensive tutorial covers basic tweens, timelines, and scroll-triggered animations.',
    'beginner',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/tutorials/gsap-basics.jpg',
    'getting-started-with-gsap',
    45
  ),
  (
    'Advanced Three.js Techniques',
    'Dive deep into Three.js and learn advanced 3D rendering techniques. We cover shaders, post-processing, physics integration, and performance optimization.',
    'advanced',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/tutorials/threejs-advanced.jpg',
    'advanced-threejs-techniques',
    90
  ),
  (
    'Responsive Design with Tailwind CSS',
    'Master responsive web design using Tailwind CSS utility classes. Learn mobile-first design, custom breakpoints, and advanced layout techniques.',
    'intermediate',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/tutorials/tailwind-responsive.jpg',
    'responsive-design-tailwind',
    60
  ),
  (
    'Next.js App Router Deep Dive',
    'Explore the new Next.js App Router architecture. Learn about server components, streaming, parallel routes, and advanced data fetching patterns.',
    'intermediate',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/tutorials/nextjs-app-router.jpg',
    'nextjs-app-router-deep-dive',
    75
  ),
  (
    'Building Interactive UI Components',
    'Create beautiful and accessible interactive UI components from scratch. Covers animations, keyboard navigation, and ARIA attributes.',
    'beginner',
    NULL,
    '/images/tutorials/ui-components.jpg',
    'building-interactive-ui-components',
    55
  ),
  (
    'Performance Optimization Masterclass',
    'Learn how to optimize your web applications for maximum performance. Covers lazy loading, code splitting, caching strategies, and Core Web Vitals.',
    'advanced',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/tutorials/performance.jpg',
    'performance-optimization-masterclass',
    120
  );


-- ============================================
-- PRODUCTS TABLE (Parkour Gear) - v2 with bilingual support
-- ============================================

-- Create custom enum for product categories
CREATE TYPE product_category AS ENUM ('clothes', 'shoes', 'accessories');

-- Create products table with bilingual support
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fa TEXT NOT NULL,
  category product_category NOT NULL DEFAULT 'clothes',
  price NUMERIC NOT NULL,
  discount_percentage NUMERIC NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  telegram_username TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_products_slug ON products(slug);

-- Create index on category for filtering
CREATE INDEX idx_products_category ON products(category);

-- Create index on in_stock for filtering available products
CREATE INDEX idx_products_in_stock ON products(in_stock);

-- Create index on created_at for sorting
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access products" ON products
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert products" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update products" ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger to auto-update updated_at on row modification
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products data
INSERT INTO products (title_en, title_fa, description_en, description_fa, category, price, discount_percentage, images, slug, sizes, colors, telegram_username, in_stock) VALUES
  (
    'Parkour Pro T-Shirt',
    'تیشرت پارکور Pro',
    'Athletic t-shirt designed for parkour with soft and flexible fabric. Suitable for intense training and acrobatic movements.',
    'تیشرت ورزشی مخصوص پارکور با پارچه نرم و انعطاف‌پذیر. مناسب برای تمرینات سنگین و حرکات آکروباتیک.',
    'clothes',
    450000,
    10,
    ARRAY['/images/products/tshirt-parkour-1.jpg', '/images/products/tshirt-parkour-2.jpg'],
    'parkour-pro-tshirt',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Black', 'White', 'Gray'],
    'masoudnell',
    true
  ),
  (
    'Freerun Jogger Pants',
    'شلوار جاگر فری‌ران',
    'Professional jogger pants with elastic waist and lightweight fabric. Ergonomic design for maximum freedom of movement.',
    'شلوار جاگر حرفه‌ای با کمر کشی و پارچه سبک. طراحی ارگونومیک برای حداکثر آزادی حرکت.',
    'clothes',
    680000,
    0,
    ARRAY['/images/products/jogger-freerun-1.jpg'],
    'freerun-jogger-pants',
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Black', 'Navy'],
    'masoudnell',
    true
  ),
  (
    'Parkour Fila Shoes',
    'کفش پارکور فیلا',
    'Parkour-specific shoes with strong grip sole and lightweight design. Perfect for jumping and landing.',
    'کفش مخصوص پارکور با زیره گریپ قوی و سبک. مناسب برای پرش و فرود.',
    'shoes',
    1850000,
    15,
    ARRAY['/images/products/shoes-parkour-1.jpg', '/images/products/shoes-parkour-2.jpg', '/images/products/shoes-parkour-3.jpg'],
    'parkour-fila-shoes',
    ARRAY['40', '41', '42', '43', '44', '45'],
    ARRAY['Black', 'White'],
    'masoudnell',
    true
  ),
  (
    'Street Parkour Hoodie',
    'هودی پارکور استریت',
    'Hooded sweatshirt with street design. Warm and comfortable for winter training.',
    'هودی کلاهدار با طراحی استریت. گرم و راحت برای تمرینات زمستانی.',
    'clothes',
    850000,
    0,
    ARRAY['/images/products/hoodie-street-1.jpg'],
    'street-parkour-hoodie',
    ARRAY['M', 'L', 'XL', 'XXL'],
    ARRAY['Black', 'Dark Gray'],
    'masoudnell',
    false
  ),
  (
    'Parkour Grip Gloves',
    'دستکش پارکور گریپ',
    'Fingerless gloves with anti-slip palm. Hand protection for bar and vault training.',
    'دستکش نیم‌انگشت با کف ضد لغزش. محافظت از دست در تمرینات بار و ول.',
    'accessories',
    180000,
    5,
    ARRAY['/images/products/gloves-grip-1.jpg'],
    'parkour-grip-gloves',
    ARRAY['S', 'M', 'L'],
    ARRAY['Black'],
    'masoudnell',
    true
  ),
  (
    'Parkour Backpack',
    'کوله‌پشتی پارکور',
    'Lightweight and durable backpack with adjustable straps. Suitable for carrying training gear.',
    'کوله‌پشتی سبک و مقاوم با بندهای قابل تنظیم. مناسب برای حمل وسایل تمرین.',
    'accessories',
    520000,
    0,
    ARRAY['/images/products/backpack-parkour-1.jpg', '/images/products/backpack-parkour-2.jpg'],
    'parkour-backpack',
    ARRAY[],
    ARRAY['Black', 'Gray', 'Orange'],
    'masoudnell',
    true
  );
