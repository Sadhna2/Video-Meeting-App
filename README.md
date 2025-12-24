# Video Meeting App

A full-stack video meeting application that enables users to create and join real-time video meetings with chat and participant management.

---

## Features
- Create and join video meetings
- Real-time video and audio communication using WebRTC
- Live group chat during meetings
- Secure routing and protected pages

---

## Tech Stack

### Frontend
- React
- WebRTC
- Socket.io Client
- CSS Modules

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB

---

## Project Structure

```
video-meet/
├── frontend/   # React client
└── backend/    # Node.js + Express server
```

---

##  Environment Variables

Create a `.env` file inside the `backend` folder using the example below:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

---

##  Running the Project Locally

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:5000

---

## Author
Sadhna Gupta
