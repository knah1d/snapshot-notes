# Snapshot Notes

A full-stack note-taking application with image uploads and user statistics.

## Features

-   User authentication with JWT
-   Note creation, editing, and deletion
-   Image uploads (up to 3 images per note)
-   User statistics dashboard
-   Dark mode support
-   Responsive design for mobile and desktop

## Tech Stack

**Frontend:** Next.js, TypeScript, Tailwind CSS  
**Backend:** Express.js, MongoDB, JWT, Multer for file uploads

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   MongoDB

### Quick Start

1. Clone and install dependencies:

```bash
git clone https://github.com/yourusername/snapshot-notes.git
cd snapshot-notes

# Install API dependencies
cd api && npm install

# Install client dependencies
cd ../client && npm install
```

2. Set up environment variables:

    - API (`.env` in `/api`): `PORT=3001`, `MONGODB_URI`, `JWT_SECRET`
    - Client (`.env.local` in `/client`): `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

3. Create uploads directory:

```bash
mkdir -p api/uploads && chmod 777 api/uploads
```

4. Start the application:

```bash
# Terminal 1
cd api && npm run dev

# Terminal 2
cd client && npm run dev
```

5. Open `http://localhost:3000` in your browser

## Project Structure

### API

-   `controllers/`: API endpoint handlers
-   `middlewares/`: Auth, error handling, file uploads
-   `models/`: Database schemas
-   `routes/`: API routes
-   `uploads/`: Stored images

### Client

-   `app/`: Next.js pages
-   `components/`: UI components
-   `services/`: API service functions
-   `types/`: TypeScript definitions
-   `utils/`: Helper functions

## API Endpoints

### Auth

-   `POST /api/auth/register`: Register user
-   `POST /api/auth/login`: Login user
-   `POST /api/auth/refresh`: Refresh token

### Notes

-   `GET /api/notes`: Get all notes
-   `POST /api/notes`: Create note (with images)
-   `GET /api/notes/:id`: Get specific note
-   `PUT /api/notes/:id`: Update note
-   `DELETE /api/notes/:id`: Delete note

### Profile

-   `GET /api/profile/me`: Get profile
-   `PUT /api/profile`: Update profile
-   `GET /api/profile/stats`: Get user stats

## Key Features

### Image Upload

-   Drag-and-drop interface
-   Multer middleware for storage
-   Preview before submission

### User Statistics

-   Track total notes
-   Recent activity monitoring

## Deployment

### Manual

```bash
# Backend
cd api && npm install --production && node index.js

# Frontend
cd client && npm run build && npm start
```

## Troubleshooting

-   **Image uploads**: Ensure `/api/uploads` has write permissions
-   **Auth issues**: Tokens expire after 1 hour; check console for errors
-   **Database**: Verify MongoDB connection string and status

## Security

-   Password hashing with bcrypt
-   JWT protection for all routes
-   Image upload validation (type, size limits)


