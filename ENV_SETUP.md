# Environment Setup for Tutorials Feature

## Supabase Configuration

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project (or use existing)
2. Navigate to **Project Settings** → **API**
3. Copy the **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Setting Up the Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/schema.sql`
4. Paste and run the SQL to create the tutorials table with sample data

### Testing Without Supabase

The tutorials feature includes mock data that will be used automatically when:

- Supabase environment variables are not configured
- The database is empty
- There's an error connecting to Supabase

This allows you to preview the tutorials UI without setting up the database.
