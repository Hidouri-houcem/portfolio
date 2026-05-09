require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any localhost or 127.0.0.1 origin with any port
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || 
        origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    
    // Allow specific production origins if needed
    const allowedOrigins = process.env.FRONTEND_URL ? 
      (Array.isArray(process.env.FRONTEND_URL) ? process.env.FRONTEND_URL : [process.env.FRONTEND_URL]) : 
      [];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs (increased for development)
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// In-memory storage for messages (in production, use a database)
const messages = [];

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;

  // Check required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  // Validate name
  if (!validator.isLength(name.trim(), { min: 2, max: 50 })) {
    return res.status(400).json({
      success: false,
      error: 'Name must be between 2 and 50 characters'
    });
  }

  // Validate email
  if (!validator.isEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address'
    });
  }

  // Validate message
  if (!validator.isLength(message.trim(), { min: 10, max: 1000 })) {
    return res.status(400).json({
      success: false,
      error: 'Message must be between 10 and 1000 characters'
    });
  }

  // Sanitize inputs
  req.body.name = validator.escape(name.trim());
  req.body.email = validator.normalizeEmail(email.trim());
  req.body.message = validator.escape(message.trim());

  next();
};

// POST /api/contact - Handle contact form submissions
app.post('/api/contact', validateContactForm, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create message object
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    };

    // Store message (in production, save to database)
    messages.push(newMessage);

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date(newMessage.timestamp).toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>IP Address:</strong> ${newMessage.ip}</p>
            <p style="margin: 5px 0;"><strong>Message ID:</strong> ${newMessage.id}</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log the message (for debugging)
    console.log('New contact message received and email sent:', {
      id: newMessage.id,
      name: newMessage.name,
      email: newMessage.email,
      timestamp: newMessage.timestamp,
      ip: newMessage.ip
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: newMessage.id,
        timestamp: newMessage.timestamp
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Check if it's an email sending error
    if (error.code === 'EAUTH') {
      res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email configuration.'
      });
    } else if (error.code === 'ECONNECTION') {
      res.status(500).json({
        success: false,
        error: 'Could not connect to email server. Please try again later.'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server error. Please try again later.'
      });
    }
  }
});

// GET /api/messages - Get all messages (for admin purposes)
app.get('/api/messages', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    messagesCount: messages.length
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Messages: http://localhost:${PORT}/api/messages`);
});

module.exports = app;
