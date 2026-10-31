# Task App API

A Node.js REST API for user registration, login, and managing personal tasks. It uses Express, MongoDB with Mongoose, and JWT authentication.

## Requirements

- Node.js 18 or newer
- MongoDB, running locally or available through a connection URI

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and set your MongoDB connection URI and a long, random JWT secret. Keep `.env` private; it is excluded by `.gitignore`.

## Run

Start in development mode with automatic restarts:

```bash
npm run dev
```

Start normally:

```bash
npm start
```

The server uses port `5000` by default. Set `PORT` in `.env` to use another port.

## API routes

The API base URL is `http://localhost:5000` when using the default port.

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a user with `username`, `email`, and `password` |
| POST | `/api/auth/login` | Public | Log in with `email` and `password`; returns a JWT |
| GET | `/api/tasks` | JWT required | List the signed-in user's tasks |
| POST | `/api/tasks` | JWT required | Create a task with `title` and `description`; `completed` is optional |
| PATCH | `/api/tasks/:id` | JWT required | Update a task's `title`, `description`, or `completed` fields |
| DELETE | `/api/tasks/:id` | JWT required | Delete a task |

For protected routes, send the token in the request header:

```text
Authorization: Bearer <token>
```
