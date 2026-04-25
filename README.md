# File Uploader

A simple Node.js file uploader application with user authentication, secure sessions, and per-user file management.

## Features

- User registration and login using Passport.js with local strategy
- Session storage in PostgreSQL via `connect-pg-simple`
- File uploads using `multer`
- Per-user file metadata saved in PostgreSQL
- Download and delete file actions from the authenticated dashboard
- Form validation with `express-validator`
- EJS templates for server-rendered pages

## Tech stack

- Node.js / Express
- Passport.js
- PostgreSQL
- Drizzle ORM
- Multer
- EJS
- Tailwind CSS (via CDN)

## Project structure

- `src/app.js` — application entry point
- `src/config/` — passport, session, and multer setup
- `src/controllers/` — route handlers and business logic
- `src/routes/` — route definitions
- `src/db/` — Drizzle database schema and connection
- `src/middlewares/` — authentication and validation middleware
- `src/views/` — EJS templates
- `uploads/` — uploaded files directory

## Requirements

- Node.js 18+ (or compatible)
- PostgreSQL database

## Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Create a `.env` file in the project root with:

```env
DATABASE_URL=postgres://user:password@host:port/database
SESSION_SECRET=your_session_secret
PORT=3001
```

## Installation

```bash
npm install
```

## Database setup

The app uses Drizzle ORM and expects a PostgreSQL database.

If you need to create the schema from `src/db/schema.js`, use Drizzle Kit:

```bash
npm run db:push
```

## Run the app

```bash
npm run dev
```

The server starts on `http://localhost:3001` by default.

## How it works

1. Users register with email and password.
2. Passwords are hashed with `bcryptjs`.
3. After login, users are redirected to `/dashboard`.
4. The dashboard lists files uploaded by the current user.
5. Users can upload a file from `/upload`.
6. Uploaded files are stored in `uploads/`, and metadata is saved in PostgreSQL.
7. Users can download or delete their own files.

## Upload behavior

- Maximum file size: 10 MB
- Stored in `uploads/`
- File metadata includes original name, path, size, user ID, and timestamp

## Notes

- Make sure `uploads/` exists and is writable.
- The app enforces that only authenticated users can access `/dashboard`, `/upload`, `/logout`, and file actions.
