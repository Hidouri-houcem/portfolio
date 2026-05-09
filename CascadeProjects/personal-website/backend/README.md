# Portfolio Backend API

Backend server for the Personal Developer Portfolio contact form.

## Features

- Express.js server with CORS support
- Input validation and sanitization
- Rate limiting (5 requests per 15 minutes per IP)
- Error handling and logging
- In-memory message storage
- Health check endpoint

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "Your Name",
  "email": "your.email@example.com", 
  "message": "Your message here..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon.",
  "data": {
    "id": "1640995200000",
    "timestamp": "2022-01-01T00:00:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /api/messages
Get all submitted messages (for admin purposes).

### GET /api/health
Health check endpoint.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the backend directory with your Gmail credentials:

```env
# Gmail Configuration
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password

# Recipient Email (where to send contact form messages)
RECIPIENT_EMAIL=houssemhidouri057@gmail.com

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Important Gmail Setup:**
- Enable 2-factor authentication on your Gmail account
- Generate an App Password (not your regular password):
  1. Go to Google Account settings
  2. Security → 2-Step Verification → App passwords
  3. Generate a new app password for "Mail"
  4. Use this app password in the `EMAIL_PASS` field

3. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000` by default.

## Environment Variables

Optional environment variables:
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Request timeout (10 seconds)

## Integration with Frontend

The frontend Contact component is configured to connect to this backend at `http://localhost:5000/api/contact`.

Make sure to start this backend server before testing the contact form in the frontend.
