-- Enable required extensions
create extension if not exists pgcrypto;

-- Roles enum
do $$ begin
  create type public.user_role as enum ('admin', 'buyer');
exception when duplicate_object then null; end $$;

-- Helper: is_admin()
create or replace function public.is_admin() returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- Profiles table (mirror of auth.users with role)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role public.user_role not null default 'buyer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

-- Create profile on user signup
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Strains table
create table if not exists public.strains (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('Indoor','Outdoor','Greenhouse')),
  thca_percent numeric(5,2) not null check (thca_percent >= 0),
  price_lb numeric(10,2) not null check (price_lb >= 0),
  quantity integer not null default 0 check (quantity >= 0),
  description text,
  availability boolean not null default true,
  image_url text,
  video_url text,
  coa_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_strains_updated_at on public.strains;
create trigger trg_strains_updated_at before update on public.strains
for each row execute procedure public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.strains enable row level security;

-- Profiles policies
create policy "profiles_read_authenticated" on public.profiles
for select to authenticated using (true);

create policy "profiles_update_admin_only" on public.profiles
for update to authenticated using (public.is_admin());

-- Strains policies
create policy "strains_read_authenticated" on public.strains
for select to authenticated using (true);

create policy "strains_write_admin_only" on public.strains
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage buckets
insert into storage.buckets (id, name, public) values
  ('strain-images','strain-images', false)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values
  ('strain-videos','strain-videos', false)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values
  ('strain-coa','strain-coa', false)
  on conflict (id) do nothing;

-- Storage policies
create policy "images_read_authenticated" on storage.objects for select to authenticated
  using ( bucket_id = 'strain-images' );
create policy "images_admin_write" on storage.objects for all to authenticated
  using ( bucket_id = 'strain-images' and public.is_admin() )
  with check ( bucket_id = 'strain-images' and public.is_admin() );

create policy "videos_read_authenticated" on storage.objects for select to authenticated
  using ( bucket_id = 'strain-videos' );
create policy "videos_admin_write" on storage.objects for all to authenticated
  using ( bucket_id = 'strain-videos' and public.is_admin() )
  with check ( bucket_id = 'strain-videos' and public.is_admin() );

create policy "coa_read_authenticated" on storage.objects for select to authenticated
  using ( bucket_id = 'strain-coa' );
create policy "coa_admin_write" on storage.objects for all to authenticated
  using ( bucket_id = 'strain-coa' and public.is_admin() )
  with check ( bucket_id = 'strain-coa' and public.is_admin() );