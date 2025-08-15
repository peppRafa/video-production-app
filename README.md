# Video Production Management App

A comprehensive video production management platform with AI-powered suggestions and collaborative features.

## Features

### MVP (Phase 1)
- **Project Management**: Create, edit, and delete projects with four-phase structure
- **Media Upload & Storage**: Upload and categorize images (locations, cast, props)
- **AI Integration**: DeepSeek AI-powered suggestions for locations, casting, and scheduling
- **Deadline Tracking**: Calendar view with notifications and customizable reminders
- **Basic Collaboration**: Team member invitations with role-based permissions

### Tech Stack
- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL + Firebase for real-time features
- **File Storage**: AWS S3 or Firebase Storage
- **AI Integration**: DeepSeek API
- **Authentication**: Firebase Auth with OAuth 2.0

## Quick Start

1. **Install dependencies**:
   ```bash
   npm run install-deps
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env` in both `server/` and `client/` directories
   - Add your API keys and database credentials

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Project Structure

```
video-production-app/
├── client/                 # React.js frontend
├── server/                 # Node.js backend
├── database/              # Database schemas and migrations
├── docs/                  # Documentation
└── package.json           # Root package configuration
```

## Database Schema

- **Users**: User accounts and profiles
- **Projects**: Video production projects
- **Phases**: Four-phase structure (Development, Pre-production, Production, Post-production)
- **Tasks**: Phase-specific tasks with deadlines
- **Media**: Uploaded files and media assets
- **Team**: Project team members and permissions

## Development Timeline

- **MVP Development**: 12 weeks
- **Testing & Bug Fixes**: 4 weeks
- **Launch**: 2 weeks
- **Advanced Features**: 8 weeks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
