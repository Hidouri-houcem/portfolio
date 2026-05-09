const nodemailer = require('nodemailer');
const validator = require('validator');

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Main handler function for Vercel serverless
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be between 2 and 100 characters'
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 10 and 2000 characters'
      });
    }

    // Sanitize inputs
    const sanitizedName = validator.escape(name.trim());
    const sanitizedEmail = validator.normalizeEmail(email.trim());
    const sanitizedMessage = validator.escape(message.trim());

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Message from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Source:</strong> Vercel Serverless Function</p>
            <p style="margin: 5px 0;"><strong>User Agent:</strong> ${req.headers['user-agent'] || 'Unknown'}</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', {
      name: sanitizedName,
      email: sanitizedEmail,
      timestamp: new Date().toISOString()
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Check for specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email configuration.'
      });
    } else if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Could not connect to email server. Please try again later.'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error. Please try again later.'
      });
    }
  }
};
