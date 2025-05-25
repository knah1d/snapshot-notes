# Snapshot Notes

A full-stack note-taking application built with Next.js, Express, and MongoDB.

## Project Overview

Snapshot Notes is a modern web application that allows users to create, manage, and organize their notes. With a clean and intuitive interface, users can quickly capture their thoughts and access them from anywhere.

## Features

- **User Authentication**: Secure signup and login functionality
- **Note Management**: Create, read, update, and delete notes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting conditions
- **Real-time Updates**: Changes reflect immediately without page refreshes

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript
- Tailwind CSS for styling

### Backend
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snapshot-notes.git
cd snapshot-notes
```

2. Install dependencies:
```bash
# Install API dependencies
cd api
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:

For the API, create a `.env` file in the `/api` directory with the following variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/snapshot-notes
JWT_SECRET=your_secret_key_here
```

For the client, create a `.env.local` file in the `/client` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Running the Application

1. Start the API server:
```bash
cd api
npm run dev
```

2. In a separate terminal, start the client:
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

### API

- `controllers/`: Request handlers for routes
- `middlewares/`: Custom middleware functions
- `models/`: MongoDB schema definitions
- `routes/`: Express route definitions
- `validators/`: Input validation functions
- `config/`: Configuration files

### Client

- `app/`: Next.js app directory with page components
- `components/`: Reusable UI components
- `services/`: API service functions
- `types/`: TypeScript type definitions
- `utils/`: Utility functions

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user and get token

### Notes
- `GET /api/notes`: Get all notes for authenticated user
- `POST /api/notes`: Create a new note
- `GET /api/notes/:id`: Get a specific note
- `PUT /api/notes/:id`: Update a note
- `DELETE /api/notes/:id`: Delete a note

### Profile
- `GET /api/profile`: Get user profile
- `PUT /api/profile`: Update user profile

## Deployment

### Using Docker (with Docker Compose)

1. Make sure Docker and Docker Compose are installed
2. Run the following command:
```bash
docker-compose up -d
```

### Manual Deployment

#### Backend
1. Build the API:
```bash
cd api
npm install --production
```

2. Set up environment variables for production
3. Start the server:
```bash
node index.js
```

#### Frontend
1. Build the Next.js application:
```bash
cd client
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

