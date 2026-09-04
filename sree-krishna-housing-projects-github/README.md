# Sree Krishna Housing Projects

A production-ready starter for a real-estate website with:

- Next.js 15
- Supabase Authentication
- Supabase PostgreSQL
- Supabase Storage for property images
- Public property listings
- Admin dashboard
- Property CRUD foundation
- Enquiries and site visit requests
- Responsive UI
- Vercel deployment configuration

## 1. Install

```bash
npm install
```

## 2. Create Supabase project

Create a project in Supabase and run:

`supabase/schema.sql`

Then create a Storage bucket named `property-images` and run the storage SQL included in the schema.

## 3. Configure environment variables

Copy:

```bash
cp .env.example .env.local
```

Add your Supabase Project URL and Publishable/Anon Key.

## 4. Create admin user

In Supabase Authentication, create a user with Email/Password.

## 5. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Admin login:

`http://localhost:3000/admin/login`

## 6. Deploy

Push this repository to GitHub, import it into Vercel, and add the same environment variables in Vercel.

## Important

This project intentionally does not contain secret keys. Never commit `.env.local`.
