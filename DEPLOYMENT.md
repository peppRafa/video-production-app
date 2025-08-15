# Deployment Guide - Video Production Management App

## Quick Setup for Testing with Friends

### Option 1: Railway (Recommended - Easiest)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub account
3. Create new project from GitHub repo
4. Add PostgreSQL database service
5. Set environment variables:
   ```
   DATABASE_URL=<provided by Railway>
   JWT_SECRET=your_super_secret_jwt_key_here_12345
   NODE_ENV=production
   ```
6. Deploy automatically - get live URL to share

### Option 2: Render (Free Tier Available)
1. Go to [render.com](https://render.com)
2. Connect GitHub account
3. Use the `render.yaml` file for automatic setup
4. Creates both frontend and backend + database
5. Get live URL in ~10 minutes

### Option 3: Vercel + Supabase (Fast Setup)
1. **Frontend**: Deploy to [vercel.com](https://vercel.com)
   - Connect GitHub repo
   - Auto-deploys from `/client` folder
2. **Database**: Create free PostgreSQL at [supabase.com](https://supabase.com)
3. **Backend**: Deploy server to Railway or Render

## Local Database Setup (Required First)

### Step 1: Create PostgreSQL Database
```bash
# Run the setup script
setup-db.bat
```

Or manually:
```bash
psql -U postgres -c "CREATE DATABASE video_production_db;"
psql -U postgres -d video_production_db -f database/schema.sql
psql -U postgres -d video_production_db -f database/seed.sql
```

### Step 2: Update Environment Variables
Edit `server/.env`:
```env
DB_PASSWORD=your_postgres_password
```

### Step 3: Test Locally
```bash
npm run dev
```

## Live Demo Setup (Fastest for Friends)

### Using Railway (5 minutes):
1. Push code to GitHub
2. Connect Railway to your repo
3. Add PostgreSQL service
4. Deploy - get shareable URL

### Using Netlify + Railway:
1. **Frontend**: Deploy client to Netlify
2. **Backend**: Deploy server to Railway
3. Update API URLs in client

## Environment Variables for Production

```env
# Required for all deployments
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here_12345
DATABASE_URL=postgresql://user:password@host:port/database

# Optional (for full features)
DEEPSEEK_API_KEY=your_deepseek_api_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

## Testing Checklist

Before sharing with friends:
- [ ] User registration works
- [ ] User login works  
- [ ] Projects can be created
- [ ] Dashboard shows data
- [ ] AI Assistant responds
- [ ] All pages load correctly

## Sharing with Friends

Once deployed, share:
1. **Live URL** (e.g., https://your-app.railway.app)
2. **Test accounts** or let them register
3. **Feature guide** - what to test

Your friends can:
- Register new accounts
- Create video production projects
- Test AI suggestions
- Explore all features
- Provide feedback

## Quick Deploy Commands

```bash
# Build for production
cd client && npm run build

# Test production build locally
cd server && npm start

# Deploy to Railway
railway login
railway link
railway up
```
