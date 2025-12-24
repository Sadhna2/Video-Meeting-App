// ====== Module Imports ======
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');

// ====== Local Imports ======
const initializeSocket = require('./socket/socketHandler');
const userRoutes = require('./routes/user.routes');
const meetingRoutes = require('./routes/meeting.routes');

// ====== App Config ======
dotenv.config();
const app = express();
const server = http.createServer(app);

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Environment Variables ======
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ====== MongoDB Connection ======
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// ====== Routes ======
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meetings', meetingRoutes);

app.get('/', (req, res) => {
  console.log(' Hello from backend');
  res.send('Hello from backend');
});

// ====== Initialize Socket.io ======
const io = initializeSocket(server);

// ====== Start Server ======
server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
