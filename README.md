# IPO Tracker

A full-stack Indian IPO tracker built with:
- Frontend: Create React App
- Backend: Node.js + Express
- Database: PostgreSQL
- Local database: Docker Compose

## Prerequisites
- Node.js 18+
- npm
- Docker Desktop

## 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d postgres
```

Check:

```bash
docker compose ps
```

PostgreSQL runs on `localhost:5432`.

Database:
- name: `ipo_tracker`
- user: `ipo_user`
- password: `ipo_password`

## 2. Start backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend:
http://localhost:5000

Health:
http://localhost:5000/api/health

## 3. Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend:
http://localhost:3000

## API

- GET `/api/health`
- GET `/api/ipos`
- GET `/api/ipos/:id`
- GET `/api/ipos/:id/gmp`

Examples:

```bash
curl http://localhost:5000/api/ipos
curl http://localhost:5000/api/ipos/1
curl http://localhost:5000/api/ipos/1/gmp
```

## Stop database

```bash
docker compose down
```

To also delete the database volume:

```bash
docker compose down -v
```

## Important

The initial records are demo/seed data. GMP is unofficial market information and should be clearly labeled as indicative when real data is added.

# Deployment authentication hardened
