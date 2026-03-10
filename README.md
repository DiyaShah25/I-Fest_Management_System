# 🎪 I-Fest Management System

A full-stack web application for managing a college festival (I-Fest) — built with **React + Vite** on the frontend and **Node.js + Express + PostgreSQL** on the backend.

> 📄 **SRS Document:** [`IFest_SRS.pdf`](./IFest_SRS.pdf)

---

## 📋 Software Requirements Specification (SRS) Summary

### 🎯 Purpose & Scope
The I-Fest Management System is designed to **eliminate manual inefficiencies** in organizing the annual **i-Fest** at Dhirubhai Ambani University (DA-IICT). It centralizes:
- Participant registration
- Event scheduling & venue allocation
- Judge assignment & score entry
- Digital certificate generation

The system replaces error-prone Google Form submissions and spreadsheet tracking with a unified, real-time database-driven platform.

---

### 👥 User Roles (Role-Based Access Control)

| Role | Permissions |
|---|---|
| **Admin** | Full CRUD access — manage all data, users, results |
| **Judge** | View assigned events; securely enter scores |
| **Faculty / Mentor** | View event schedules and participant details |
| **Sponsor** | View sponsorship details and event listings |
| **Visitor** | Read-only access to public event info |

---

### ⚙️ Functional Requirements

| # | Feature | Description |
|---|---|---|
| FR-1 | **Participant Management** | CRUD for participants; unique Fest ID to prevent duplicate entries from multiple form submissions |
| FR-2 | **Team Registration** | Support for individual & team-based events; designates team leaders tied to a single `team_id` |
| FR-3 | **Event Scheduling & Capacity** | Real-time enforcement of capacity limits and registration deadlines; prevents overbooking |
| FR-4 | **Venue Management** | Track event locations, seating capacity, and available resources |
| FR-5 | **Judge & Scoring System** | Secure score entry by assigned judges only; linked to specific events |
| FR-6 | **Digital Certificates** | Auto-generation of e-certificates (Participation / Merit / Appreciation) based on verified results |
| FR-7 | **Sponsor Management** | Track sponsor details, contact persons, and sponsorship types |
| FR-8 | **Archive & Results** | Store and retrieve historical event data and results |

---

### 🗃️ Database Schema

The system uses a **PostgreSQL relational database** normalized to **3NF** with 13 tables:

#### Core Tables

| Table | Primary Key | Key Attributes |
|---|---|---|
| `participants` | `participant_id` | `name`, `email` (U), `college`, `phone` (U), `age`, `gender` |
| `events` | `event_id` | `event_name`, `category`, `date`, `time`, `venue`, `capacity`, `fee` |
| `venues` | `venue_id` | `venue_name`, `capacity`, `location`, `resources_available` |
| `teams` | `team_id` | `team_name`, `event_id` (FK), `leader_id` (FK) |
| `judges` | `judge_id` | `name`, `email` (U), `phone` (U), `expertise` |
| `sponsors` | `sponsor_id` | `name`, `contact_person`, `email` (U), `sponsorship_type` |
| `certificates` | `cert_id` | `participant_id` (FK), `type`, `issue_date`, `file_url` |
| `results` | `result_id` | `event_id` (FK), `participant_id` (FK), `score`, `rank` |

#### Relationship / Junction Tables

| Table | Relationship |
|---|---|
| `registrations` | Participants ↔ Events (M:N), with optional `team_id` |
| `event_judges` | Events ↔ Judges (M:N) |
| `event_sponsors` | Events ↔ Sponsors (M:N) |
| `feedback` | Participants → Events feedback |
| `archive` | Historical records of past events |

#### Key Relationships
```
Venue (1) ──── (N) Events
Events (M) ──── (N) Participants   [via Registrations]
Events (M) ──── (N) Judges         [via Event_Judges]
Events (M) ──── (N) Sponsors       [via Event_Sponsors]
Participants (1) ──── (N) Certificates
Teams (1) ──── (N) Participants
```

---

### 🔒 Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Security** | Data encryption + strict RBAC; only judges can enter scores, only admins manage the DB |
| **Performance** | Critical updates (e.g., registration) respond in **< 2 seconds** |
| **Availability** | **24/7 uptime** during the festival period |
| **Maintainability** | Modular PostgreSQL/Express/React stack with full documentation |
| **Data Integrity** | Schema enforces unique emails/phones; duplicate Fest IDs blocked |

---

### 📊 System Analysis Models

- **DFD Level 0** — Context diagram: external entities (Audience, Judge, Participant, Admin) ↔ central DBMS
- **ER Diagram** — Maps all 1:N and M:N relationships across the 13 tables
- **Normalization** — Schema optimized to **3NF** to eliminate redundancy and ensure integrity
- **QR Code Trigger** — `trg_generate_qr_data_after` auto-generates QR data for each new participant registration

---

### 🔧 Constraints & Assumptions

**Constraints:**
- System must be able to periodically import/link data from existing Google Form exports
- Unique constraints on `email` and `phone` across participants, judges, and sponsors

**Assumptions:**
- Stable internet connectivity is available at the venue during the festival
- Organizers and participants have basic web literacy
- PostgreSQL is hosted locally or on a cloud instance accessible to the backend

---

## 🗃️ Database

- **PostgreSQL** (`I-Fest` database)
- **13 tables**: `events`, `venues`, `participants`, `registrations`, `judges`, `sponsors`, `teams`, `feedback`, `certificates`, `results`, `archive`, `event_judges`, `event_sponsors`

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
├── IFest_SRS.pdf            # Full Software Requirements Specification
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

## 📋 App Features

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

## 👩‍💻 Authors

**Diya Shah** (202512025) — Semester 1 DBMS Project, DA-IICT

**Mahi Kansara** (202512078) — Semester 1 DBMS Project, DA-IICT
