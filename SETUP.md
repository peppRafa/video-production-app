# Video Production Management App - Setup Guide

## Prerequisites

Before running this application, you need to install the following:

### 1. Node.js and npm
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- This will also install npm (Node Package Manager)
- Verify installation by running:
  ```bash
  node --version
  npm --version
  ```

### 2. PostgreSQL Database
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- Create a database named `video_production_db`
- Run the schema and seed files:
  ```bash
  psql -U your_username -d video_production_db -f database/schema.sql
  psql -U your_username -d video_production_db -f database/seed.sql
  ```

## Installation Steps

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup
```bash
# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env  # if needed
```

### 3. Configure Environment Variables
Edit `server/.env` with your actual values:
- Database credentials
- JWT secret key
- DeepSeek AI API key (optional for MVP)
- AWS S3 or Firebase credentials (optional for MVP)

### 4. Create Upload Directory
```bash
mkdir server/uploads
```

## Running the Application

### Development Mode
```bash
# From the root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Individual Services
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Navigate through the different pages:
   - Dashboard: Overview of projects and stats
   - Projects: List and manage projects
   - AI Assistant: Get AI-powered suggestions
   - Team: Manage team members
   - Calendar: Track deadlines and events

## API Endpoints

The backend API is available at http://localhost:5000/api with the following endpoints:

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `POST /api/ai/suggestions` - Get AI suggestions
- `POST /api/media/upload` - Upload media files

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in package.json scripts
   - Kill existing processes using the ports

2. **Database connection errors**
   - Verify PostgreSQL is running
   - Check database credentials in .env file
   - Ensure database exists

3. **Module not found errors**
   - Run `npm install` in the affected directory
   - Clear npm cache: `npm cache clean --force`

4. **CORS errors**
   - Verify frontend URL is allowed in server CORS config
   - Check proxy setting in client package.json

### Development Tips

- Use browser developer tools to debug frontend issues
- Check server console for backend errors
- Use Postman or similar tools to test API endpoints
- Monitor database queries for performance issues

## Next Steps

1. Set up a PostgreSQL database
2. Configure environment variables
3. Install Node.js and npm
4. Run the installation commands
5. Start the development servers

The application is now ready for development and testing!
