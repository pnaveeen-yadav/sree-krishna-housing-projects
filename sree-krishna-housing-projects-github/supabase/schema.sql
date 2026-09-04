-- SREE KRISHNA HOUSING PROJECTS
-- Run this entire file in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists properties (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 property_type text,
 location text,
 price text,
 area text,
 description text,
 amenities text[] default '{}',
 image_urls text[] default '{}',
 featured boolean default false,
 status text default 'Available',
 created_at timestamptz default now()
);

create table if not exists enquiries (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 phone text not null,
 email text,
 message text,
 property_id uuid references properties(id) on delete set null,
 created_at timestamptz default now()
);

create table if not exists site_visits (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 phone text not null,
 property_id uuid references properties(id) on delete set null,
 preferred_date date,
 preferred_time text,
 created_at timestamptz default now()
);

alter table properties enable row level security;
alter table enquiries enable row level security;
alter table site_visits enable row level security;

-- Public website
create policy "public read available properties"
on properties for select using (status = 'Available');

-- Public forms
create policy "public insert enquiries"
on enquiries for insert with check (true);

create policy "public insert site visits"
on site_visits for insert with check (true);

-- Logged-in admin users can manage records.
-- For a single-company project, create only trusted admin accounts.
create policy "authenticated manage properties"
on properties for all to authenticated using (true) with check (true);

create policy "authenticated read enquiries"
on enquiries for select to authenticated using (true);

create policy "authenticated read site visits"
on site_visits for select to authenticated using (true);

-- Create Storage bucket manually in Supabase Dashboard:
-- Name: property-images
-- Public: true
