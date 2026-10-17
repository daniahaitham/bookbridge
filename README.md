# BookBridge

A full-stack web app where people list books they want to lend, sell or exchange, and request books from other users. Includes an admin panel for moderation, statistics and complaint handling.

Built as a 3rd-year university project at Al-Hussein Technical University.

> **Screenshots:** add 3–4 images to a `screenshots/` folder (home, book details, profile/requests, admin stats) and link them here.

## Features

**Users**
- Sign up, log in, log out
- Add, edit and delete books you offer; see only your own offered books
- Browse books offered by others and open a details page
- Send requests to borrow or exchange a book; accept or reject incoming requests; track your outgoing requests
- Submit complaints to the admins

**Admins**
- Edit or delete any book
- View application statistics
- View complaints and mark them as resolved

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router, CSS |
| Backend | Node.js, Express 5, `pg`, `bcryptjs` |
| Database | PostgreSQL |
| External API | Quotable (random quote on the home page, with a fallback message) |

## Project structure

```
bookbridge/
├── backend/    Express REST API (routes: auth, users, books, requests, complaints)
├── frontend/   React app
└── database/   schema.sql
```

## Run it locally

You need Node.js 18+ and PostgreSQL.

**1. Database**
```bash
psql -U postgres -c 'CREATE DATABASE "BookBridge";'
psql -U postgres -d BookBridge -f database/schema.sql
```

**2. Backend**
```bash
cd backend
cp .env.example .env        # then put your own database URL in .env
npm install
npm start                   # http://localhost:5000
```

**3. Frontend**
```bash
cd frontend
cp .env.sample .env
npm install
npm run dev
```

To create an admin, sign up normally, then run `UPDATE users SET is_admin = true WHERE email = 'you@example.com';`

## API overview

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/signup`, `POST /api/auth/login` |
| Users | `GET/POST /api/users`, `GET/PUT/DELETE /api/users/:id` |
| Books | `/api/books` (list, create, details, update, delete) |
| Requests | `/api/req` (send, incoming, outgoing, accept/reject) |
| Complaints | `/api/complaints` (submit, list, resolve) |

Admin-only endpoints expect the header `X-Role: admin`.

## Known limitations

This is a learning project, so some things are deliberately simple:
- Passwords are hashed with bcrypt, but there are no sessions or JWTs. Admin-only routes are protected by the `X-Role` header, which a client can fake. Real token-based authentication is the next improvement.
- No automated tests yet.

## What I learned

- How a request travels from a React component, through an Express route, to PostgreSQL and back
- Designing a relational schema with foreign keys and cascading deletes
- Role-based features (user vs admin) and password hashing
- Splitting a project across a frontend and backend repository structure
