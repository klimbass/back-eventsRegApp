# Events Registration API (Backend)

A robust Node.js backend API with real-time WebSocket support for event management system. Handles event registration, participant management, and live viewer statistics.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

## Live Deployment

**API Base URL**: `https://back-eventsregapp.onrender.com`  
**WebSocket URL**: `wss://back-eventsregapp.onrender.com`  
**Frontend**: [Events Registration App](https://events-reg-app.vercel.app)

## 📋 API Documentation

### Base URL
[https://back-eventsregapp.onrender.com](https://back-eventsregapp.onrender.com)


### Events Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/events` | Get paginated events list |
| `GET` | `/events/:id` | Get specific event details |
| `POST` | `/events/:id/register` | Register participant for event |
| `GET` | `/events/:id/participants` | Get event participants |

### Query Parameters for `/events`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number for pagination |
| `perPage` | number | `8` | Items per page |
| `sortBy` | string | `date` | Sort field (`title`, `date`, `organizer`) |
| `sortOrder` | string | `asc` | Sort direction (`asc`, `desc`) |

## WebSocket Real-time Features

### Connection
```javascript
const ws = new WebSocket('wss://back-eventsregapp.onrender.com');
```
### Events
| Event Type | Direction | Description |
|--------|----------|-------------|
| `VIEWING_EVENT` | `Client → Server` | User starts viewing an event |
| `LEFT_EVENT` | `Client → Server` | User stops viewing an event |
| `VIEWER_COUNT_UPDATE` | `Server → Client` | Live viewer count update |
| `WELCOME` | `Server → Client` | Connection established |

### Example Usage
```javascript
// Subscribe to event viewing
ws.send(JSON.stringify({
  type: 'VIEWING_EVENT',
  eventId: '66fc68e53ledb60lc1642476'
}));

// Receive live updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'VIEWER_COUNT_UPDATE') {
    console.log(`Event ${data.eventId} has ${data.count} viewers`);
  }
};
```
## Architecture
```
src/
├── routers/           # API route handlers
│   └── index.js      # Main router configuration
├── websocket/        # Real-time communication
│   ├── index.js      # WebSocket server setup
│   ├── handlers.js   # Message handlers
│   └── utils.js      # Utility functions
├── middlewares/      # Express middlewares
│   ├── errorHandler.js # Global error handling
│   └── notFoundHandler.js # 404 handling
├── utils/
│   └── env.js        # Environment configuration
└── server.js         # Application entry point
```

## Tech Stack

### Core

   - Node.js - Runtime environment
   - Express.js - Web framework
   - MongoDB - Database with Mongoose ODM
   - WebSocket - Real-time communication

### Development
   - Vite - Build tool and dev server
   - Pino - Structured logging
   - CORS - Cross-origin resource sharing

### Deployment
   - Render.com - Cloud platform hosting
   - MongoDB Atlas - Cloud database

## Quick Start
### Prerequisites
   - Node.js 18+
   - MongoDB database

### Installation
  **Clone repository**
  ```
  git clone https://github.com/klimbass/back-eventsRegApp.git
  cd back-eventsRegApp

  ```
  **Install dependencies**
  ```
  npm install
  ```

  **Environment setup**
  Create .env file:
  ```
  PORT=3000
  MONGODB_URL=your_mongodb_connection_string
  DEPLOYEDFRONT=your_frontend_production_url
  LOCALHOST=your_frontend_development_url
  ```

  **Start development server**
  ```
  npm run dev
  ```
  Server runs on *http://localhost:3000*

  **Production Build**
  ```
  npm run build
  npm start
  ```
## API Usage Examples
### Get Events with Pagination
```
curl "https://back-eventsregapp.onrender.com/events?page=1&perPage=8&sortBy=date"
```

### Register for Event
```
curl -X POST "https://back-eventsregapp.onrender.com/events/123/register" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01",
    "referralSource": "friends"
  }'
```

### Get Event Participants
```
curl "https://back-eventsregapp.onrender.com/events/123/participants"
```

## Deployment
### Environment Variables for Production
  -  **PORT** - Server port (Render sets automatically)
  -  **MONGODB_URL** - MongoDB connection string
  -  **DEPLOYEDFRONT** - Frontend URL for CORS
  -  **LOCALHOST** - Local development URL

### Render.com Setup
   - Connect GitHub repository
   - Set environment variables
   - Automatic deploys on git push

## Features
### Security
   - CORS configured for frontend domains
   - Input validation on all endpoints
   - Error handling with meaningful messages

### Performance
   - Pagination for large datasets
   - Efficient queries with MongoDB indexing
   - WebSocket connections with proper cleanup

### Real-time Capabilities
   - Live viewer tracking for events
   - Instant updates to all connected clients
   - Connection management with automatic cleanup

## Database Schema
### Event Model
```
{
  title: String,
  description: String,
  date: Date,
  organizer: String,
  participants: [ParticipantSchema]
}
```

### Participant Model
```
{
  fullName: String,
  email: String,
  dateOfBirth: Date,
  referralSource: String,
  registrationDate: Date
}
```

## Troubleshooting
### Common Issues
   - CORS errors - Check **DEPLOYEDFRONT** environment variable
   - Database connection - Verify **MONGODB_URL** is correct
   - WebSocket connection - Ensure **wss://** protocol is used

### Logs
Access application logs through Render.com dashboard for debugging.

## Contributing
   - Fork the repository
   - Create feature branch (git checkout -b feature/improvement)
   - Commit changes (git commit -m 'Add new feature')
   - Push to branch (git push origin feature/improvement)
   - Open Pull Request

### License
This project is licensed under the MIT License - see LICENSE file for details.

## Author

**Alex Klimov** - Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/💼-LinkedIn-0A66C2)](https://www.linkedin.com/in/oleksandr-klimov-developer/)
[![GitHub](https://img.shields.io/badge/🐙-GitHub-181717)](https://github.com/klimbass)
[![Email](https://img.shields.io/badge/📧-Email-D14836)](mailto:oleksandr.klimov@web.de)[oleksandr.klimov@web.de](oleksandr.klimov@web.de)

## Acknowledgments

   - **Render.com** for reliable hosting
   - **MongoDB Atlas** for database services
   - **Express.js team** for excellent framework
