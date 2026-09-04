# Deployment Checklist

## Supabase
1. Create project.
2. Run `supabase/schema.sql`.
3. Create `property-images` Storage bucket.
4. Create your admin Email/Password user.
5. Copy Project URL and Publishable/Anon Key.

## Local
1. Copy `.env.example` to `.env.local`.
2. Add values.
3. `npm install`
4. `npm run dev`

## GitHub
```bash
git init
git add .
git commit -m "Initial Sree Krishna Housing Projects website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Vercel
1. Import the GitHub repository.
2. Add the two environment variables.
3. Deploy.
4. Add your custom domain.

Do not commit `.env.local` or any secret keys.
