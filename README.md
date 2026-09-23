# LeadTracker Pro

A full-stack web portal to manage leads, backed by an API. Includes secure authentication, responsive design, and dynamic status tracking.

## Features
- **Authentication**: JWT-based authentication with protected routes.
- **Leads CRUD**: Add, view, edit status, and delete leads.
- **Pagination**: Built-in frontend pagination for efficiently viewing large lists of leads.
- **Notes per lead**: Keep track of interactions with leads by adding notes.
- **Search & Filter**: Search leads by name, email, or phone. Filter by lead status.
- **Beautiful UI**: Modern, dynamic design with smooth CSS micro-animations.

## Tech Stack
- **Backend**: Node.js, Express, Prisma ORM, SQLite
- **Frontend**: React, Vite, Lucide Icons, react-hook-form, Yup
- **Tools**: Jest, Supertest, Docker

## Environment Variables
Before running the application, make sure to set up your environment variables. If you use the `build.sh` script, it will automatically generate the required `.env` files for both frontend and backend.

### Frontend (`frontend/.env`)
```env
VITE_API_URL="http://localhost:5001/api"
VITE_DEFAULT_EMAIL="admin@leadtech.com"
VITE_DEFAULT_PASSWORD="admin@12345678"
```

### Backend (`backend/.env`)
```env
DATABASE_URL="file:./dev.db"
PORT=5001
JWT_SECRET="ubJi4n7j5O5wjW7imT9Anz47jB82nrln4DSKA2TSufT"
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Docker (optional, for containerization)

**Default Login Credentials (created by the seed script):**
- **Email:** `admin@leadtech.com`
- **Password:** `admin@12345678`

You can set up and run this project in 3 different ways depending on your use case:

### Option 1: Development Mode (Hot Reloading) - `npm run dev`
If you are a developer and want to edit code with instant hot-reloading, run this from the root folder. It will automatically install all dependencies, configure the DB, and start both frontend and backend concurrently:
```bash
npm run dev
```

### Option 2: 1-Click Setup (Production Build) - `./build.sh`
This script builds the React frontend and serves it directly through the Node.js backend. Great for testing production behavior locally:
```bash
chmod +x build.sh
./build.sh
```
After it finishes, start the server:
```bash
cd backend
node src/server.js
```
Access the app at: [http://localhost:5001](http://localhost:5001)

### Option 3: Docker Setup
To run the application inside an isolated Docker container without needing Node.js installed on your machine:
```bash
# Build the Docker image
docker build -t leads-tracking-app .

# Run the container on port 5001
docker run -p 5001:5001 leads-tracking-app
```

## API Examples (cURL)

**Note:** For protected routes, you must include the JWT token in the `Authorization` header.

**1. Login & Get Token:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "admin@leadtech.com", "password": "admin@12345678"}'
```

**2. Get all leads (with search & status filter):**
```bash
curl "http://localhost:5001/api/leads?search=john&status=new" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**3. Create a new lead:**
```bash
curl -X POST http://localhost:5001/api/leads \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890", "status": "new"}'
```

**4. Update lead status:**
```bash
curl -X PATCH http://localhost:5001/api/leads/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{"status": "contacted"}'
```

**5. Add a note to a lead:**
```bash
curl -X POST http://localhost:5001/api/leads/1/notes \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{"content": "Called the lead, they are interested."}'
```

## Running Tests
To run the Jest unit and integration tests for the backend API (includes complete test coverage for Auth and Leads modules):
```bash
cd backend
npm test
```
