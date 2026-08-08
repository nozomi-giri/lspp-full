# LSPP Assignment

A React + TypeScript recreation of the Leapfrog Student Partnership Program landing page, with a Node/Express + MongoDB backend for dynamic mentors and FAQs, plus an admin panel with JWT-protected CRUD.

## Live Links

- **Frontend (live site):** https://lspp-frontend.vercel.app
- **Backend (API):** https://lspp-backend.onrender.com

Note: the backend link just shows "LSPP backend is running", it's an API not a webpage. The actual data loads through the frontend link above.

The backend is on Render's free tier, so it may take 30-60 seconds to wake up if it's been idle. If mentors/FAQs seem slow on first load, just give it a moment and refresh.

## Features

- Dark mode toggle
- Go to top button
- Image gallery with carousel
- Animated stats counters
- Mentors and FAQs loaded dynamically from MongoDB
- Admin login (JWT-based) with a working logout (password: Lspp@2026)
- Admin panel to add/edit/delete mentors and FAQs
- Public GET routes, protected POST/PUT/DELETE routes

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Auth:** JWT
- **Hosting:** Vercel (frontend), Render (backend)

## Running Locally

**Backend:**
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` (see `.env.example`) with:
```
MONGO_URI=your-mongodb-connection-string
PORT=5050
JWT_SECRET=your-secret
ADMIN_PASSWORD=your-admin-password
```
```bash
npm run dev
```
Backend runs on `http://localhost:5050`.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

By default the frontend talks to `localhost:5050`. To point it at a different backend, set `VITE_API_URL` in a `frontend/.env` file.

## Project Structure

```
lspp-full/
├── backend/
│   ├── config/       # MongoDB connection
│   ├── controllers/  # route logic
│   ├── middleware/   # JWT auth check
│   ├── routes/       # mentors, faqs, auth
│   └── server.js
└── frontend/
    └── src/
        ├── api/         # axios instance
        ├── components/  # UI + admin components
        ├── pages/        # Admin page
        └── context/      # theme (dark mode)
```
