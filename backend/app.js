const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { router: authRoutes } = require('./routes/auth'); 
const spotRoutes = require('./routes/spots');
const geocodeRoutes = require('./routes/geocode');
const bookingRoutes = require('./routes/bookings')
const paymentRoutes = require('./routes/payments');
const feedbackRoutes = require('./routes/feedback');
const adminRoute = require('./routes/admin')
const nodemailer = require('nodemailer')
const bodyparser = require('body-parser')

const http = require('http');
const socketIo = require('socket.io');
const db = require('./database');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', geocodeRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/auth', authRoutes);
app.use('/spots', spotRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/admin', adminRoute)

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', (data) => {
    const { senderId, receiverId, content } = data;
    const query = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
    db.query(query, [senderId, receiverId, content], (err, result) => {
      if (err) {
        console.error('Error sending message:', err);
        return;
      }

      io.emit(`receive_message_${receiverId}`, {
        messageId: result.insertId,
        senderId,
        content,
        timestamp: new Date(),
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
service: 'Gmail', // Use your email service
auth: {
user: 'maryammuhammed523@gmail.com',
pass: process.env.MAIL_PASS, // Use an app-specific password if using Gmail
},
});

// API Endpoint to Handle Form Submissions
app.post('/send-email', async (req, res) => {
const { name, email, subject, message } = req.body;

try {
// Email to Admin
await transporter.sendMail({
from: email,
to: 'admin-email@example.com', // Replace with your admin email
subject: `New Contact: ${subject}`,
text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
});

// Email to User
await transporter.sendMail({
from: 'your-email@gmail.com',
to: email, // User's email
subject: 'Thank you for reaching out!',
text: `Hi ${name},\n\nThank you for your message. We will get back to you soon!\n\nBest Regards,\nYour Company`,
});

res.status(200).send('Emails sent successfully');
} catch (error) {
console.error('Error sending email:', error);
res.status(500).send('Failed to send email');
}
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
