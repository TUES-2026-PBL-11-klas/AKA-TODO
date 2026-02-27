# AKA-TODO — Multi-User Task Management System

Full-stack web application for managing tasks, built with NestJS + Next.js + Supabase + PostgreSQL.

## Structure

```
├── backend/        NestJS REST API
├── frontend/       Next.js 14 (App Router) UI
├── database/       SQL schema
├── .env            Environment variables (not committed)
└── docker-compose.yml
```

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL (via Supabase) |
| Auth | Supabase Auth (JWT) |
| DevOps | Docker, GitHub Actions |

## Features

- Register / login / logout
- Create, edit, soft-delete tasks
- Mark tasks as done / undo
- Filter tasks by status, priority, category
- Group tasks by category
- Task statistics (total / completed / pending + progress bar)
- Full category management (create, rename, delete)
- Each user sees only their own data

## Local Development

### Prerequisites
- Node.js 20+
- A Supabase project with the schema from `database/001_init.sql` applied

### Setup

1. Copy the env template and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install           # root (concurrently)
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Start both servers:
   ```bash
   npm run dev
   ```

   - Backend: http://localhost:3000
   - Frontend: http://localhost:3001

## Database

Run `database/001_init.sql` in the Supabase SQL editor to create the tables.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/register | — | Register |
| POST | /auth/login | — | Login |
| GET | /tasks | ✓ | List tasks (filter: status, priority, category_id) |
| POST | /tasks | ✓ | Create task |
| PATCH | /tasks/:id | ✓ | Update task |
| DELETE | /tasks/:id | ✓ | Soft delete task |
| GET | /tasks/stats | ✓ | Task statistics |
| GET | /categories | ✓ | List categories |
| POST | /categories | ✓ | Create category |
| PATCH | /categories/:id | ✓ | Update category |
| DELETE | /categories/:id | ✓ | Delete category |

## Docker

```bash
docker compose up --build
```

## CI/CD

On every push to `main`, GitHub Actions builds and pushes Docker images to Docker Hub.
