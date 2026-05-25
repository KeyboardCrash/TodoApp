# TodoApp

## Project Overview

Full-stack todo application with user authentication, featuring separate frontend and backend services with MongoDB persistence.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React 18 (Create React App)
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT + bcrypt password hashing
- **Middleware**: express-mongo-sanitize, cors, body-parser

## Project Structure

```
TodoApp/
├── todo-backend/
│   ├── src/
│   │   ├── index.ts          # Entry point
│   │   ├── middlewares/       # Auth middleware
│   │   ├── model/             # Mongoose models
│   │   └── routes/            # API routes (auth, todo)
│   ├── Dockerfile
│   ├── Dockerfile.dev         # With nodemon
│   ├── Makefile
│   └── package.json
├── todo-frontend/
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── components/        # Home, Login, Register, Todo
│   │   └── lib/               # Context, helpers
│   ├── nginx/                 # Production config
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── Makefile
│   └── package.json
└── docker-compose.dev.yml
```

## Build Commands

### Backend

```bash
# From todo-backend/
npm run build              # TypeScript compile
npm run dev                # Nodemon dev server
npm start                  # Run compiled JS

# Docker
make build                 # Production image
make buildx                # Cross-arch build
make buildx-push           # Build and push
```

### Frontend

```bash
# From todo-frontend/
npm start                  # Dev server (port 3000)
npm run build              # Production build

# Docker
make build                 # Production image
make buildx                # Cross-arch build
make buildx-push           # Build and push
```

## Testing

```bash
# Backend (currently no tests configured)
npm test                   # "Error: no test specified"

# Frontend
npm test                   # Create React App tests
```

## API Endpoints

### Public Endpoints (No Authentication Required)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Register new user (username, password) |
| `/api/auth/login` | POST | Authenticate, returns JWT token (Bearer format) |

### Authenticated Endpoints (Require JWT in Authorization Header)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/getUsername` | GET | Get current user's username from JWT |
| `/api/todo` | GET | API info endpoint (returns version/message) |
| `/api/getAllTodos` | GET | List all todos for authenticated user |
| `/api/todo` | POST | Create new todo (requires `todo` field in body) |
| `/api/todo/:id` | GET | Get specific todo by ID |
| `/api/todo/:id` | PATCH | Update todo payload (partial update) |
| `/api/todo/:id` | DELETE | Delete specific todo |
| `/api/deleteAllTodos` | GET | Delete all todos for authenticated user |

**Authentication**: JWT tokens passed in `Authorization: Bearer <token>` header. Tokens expire after 1 hour (3600 seconds).

**Data Scope**: All todo operations are scoped to the `userId` extracted from the JWT token. Users can only access their own todos.

**Note**: The backend uses Mongoose with a `todos` collection where each document contains:
- `userId` (reference to user)
- `payload` object containing `checked` (boolean) and `todo` (string)

## Code Style

- **Backend**: TypeScript, class-based models, Express routing
- **Frontend**: React functional components, context for auth
- **Naming**: camelCase (JS), PascalCase (React components)

## Environment Variables

See parent `personal-site/config/.env.sample`:
- `TODO_MONGO_URI=mongodb://mongodb/todo`
- `JWT_SECRET`

## Database

- **Host**: MongoDB at `mongodb` (Docker network)
- **Database**: `todo`
- **Collections**: `users`, `todos`

## Deployment

- Images: `registry.keyboardcrash.com/todo-backend:latest`, `todo-frontend:latest`
- Domains: `todoapp.keyboardcrash.com`
- Backend: Node.js server on port 80 (compiled from TypeScript)
- Frontend: React app served via nginx on port 80
