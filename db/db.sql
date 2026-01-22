-- Enable UUID generation (usually needed for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES (Updated for Auth0)
-- "id" is now TEXT to store the Auth0 ID (e.g., 'auth0|abc123...')
-- Removed foreign key to auth.users since we handle auth externally.
create table public.profiles (
  id text primary key, 
  full_name text,
  avatar_url text,
  email text, -- Optional: Good to store if you sync it from Auth0
  updated_at timestamp with time zone default now()
);

-- 2. PRODUCTS
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  stock_quantity integer default 0,
  image_url text not null,
  category text,
  tags text[], 
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- 3. CART ITEMS (New: For your "Add to Cart" feature)
-- This allows users to hold items before they actually place an order.
create table public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.profiles(id) not null, -- Links to your synced Profile
  product_id uuid references public.products(id) not null,
  quantity integer default 1,
  created_at timestamp with time zone default now(),
  
  -- Prevent duplicate rows for the same product in one user's cart
  unique(user_id, product_id)
);

-- 4. ORDERS
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.profiles(id) not null, -- Links to your synced Profile
  total_amount numeric(10,2) not null,
  status text check (status in ('pending', 'paid', 'shipped', 'cancelled')) default 'pending',
  shipping_address jsonb,
  created_at timestamp with time zone default now()
);

-- 5. ORDER ITEMS
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity integer default 1,
  unit_price numeric(10,2) not null -- Price snapshot at time of purchase
);