# 🎪 I-Fest Management System

A full-stack web application for managing a college festival (I-Fest) — built with **React + Vite** on the frontend and **Node.js + Express + PostgreSQL** on the backend.

---

## 🗃️ Database

- **PostgreSQL** (`I-Fest` database)
- 13 tables including: `events`, `venues`, `participants`, `registrations`, `judges`, `sponsors`, `teams`, `feedback`, `certificates`, `results`, `archive`, `event_judges`, `event_sponsors`

---

## 🚀 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS v4 |
| Backend | Node.js, Express 5, pg (node-postgres) |
| Database | PostgreSQL |
| Dev Tools | concurrently, dotenv, axios |

---

## 📁 Project Structure

```
IfestApp/
├── backend/
│   ├── db/index.js          # PostgreSQL pool connection
│   ├── routes/
│   │   ├── events.js        # CRUD for events
│   │   ├── venues.js        # CRUD for venues
│   │   ├── participants.js  # CRUD for participants
│   │   └── registrations.js # Register participants for events
│   ├── server.js            # Express app entry point
│   └── .env                 # (not committed — see below)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── EventsPage.jsx
│   │   │   ├── VenuesPage.jsx
│   │   │   ├── ParticipantsPage.jsx
│   │   │   └── RegistrationsPage.jsx
│   │   ├── components/
│   │   │   └── Modal.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── package.json             # Root: runs both servers concurrently
```

---

## ⚙️ Setup & Run

### 1. Prerequisites
- Node.js >= 18
- PostgreSQL running locally with the `I-Fest` database

### 2. Clone the repo
```bash
git clone https://github.com/DiyaShah25/I-Fest_Management_System.git
cd I-Fest_Management_System
```

### 3. Configure environment
Create `backend/.env` with your PostgreSQL credentials:
```env
PORT=5000
PG_USER=postgres
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=I-Fest
```

### 4. Install dependencies
```bash
# Root (installs concurrently)
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Run the development server
```bash
# From the root folder — starts both backend and frontend
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 📋 Features

- **Events** — View, add, edit, delete events with venue assignment
- **Venues** — Manage venues with capacity and location info
- **Participants** — Full participant registry with search
- **Registrations** — Register participants for events; view and remove registrations
- Live search on all tables
- Add/Edit modal forms with validation
- Toast notifications for success/error feedback
- Responsive layout with Tailwind CSS v4

---

## 🔐 Environment Variables

The `backend/.env` file is **not committed** to this repository for security. You must create it manually (see step 3 above).

---

## 👩‍💻 Author

**Diya Shah** — Semester 1 DBMS Project

**Mahi Kansara** — Semester 1 DBMS Project
