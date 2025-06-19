# NestJS Authentication Backend

A complete NestJS authentication backend with JWT tokens, MongoDB, and Docker support. Perfect for integration with NextAuth or any frontend application.

## Features

- 🔐 **JWT Authentication** with access and refresh tokens
- 📧 **Email/Password Registration & Login**
- 🔄 **Token Refresh with Rotation** (security best practice)
- 🚪 **Secure Logout** with token invalidation
- 🛡️ **Protected Routes** with guards
- 🗄️ **MongoDB Integration** with Mongoose
- 🐳 **Docker & Docker Compose** setup
- ✅ **Input Validation** with class-validator
- 🌐 **CORS Enabled** for frontend integration

## Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone and setup**:
```bash
git clone <your-repo>
cd nestjs-auth-backend
cp .env.example .env
```

2. **Start with Docker Compose**:
```bash
docker-compose up -d
```

The API will be available at `http://localhost:3000`

### Option 2: Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Setup environment**:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

3. **Start MongoDB** (if not using Docker):
```bash
# Using MongoDB locally or MongoDB Atlas
```

4. **Run the application**:
```bash
npm run start:dev
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout
```http
POST /auth/logout
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### Protected Routes

#### Get User Profile
```http
GET /user/profile
Authorization: Bearer your-access-token
```

### Health Check
```http
GET /health
```

## Testing with cURL

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Access protected route
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh tokens
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

### Logout
```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

## Testing with Postman

1. **Import the collection**: Create a new Postman collection with the endpoints above
2. **Set environment variables**:
   - `baseUrl`: `http://localhost:3000`
   - `accessToken`: (will be set automatically)
   - `refreshToken`: (will be set automatically)

3. **Test flow**:
   - Register → Login → Access Profile → Refresh Token → Logout

## Environment Variables

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/nestjs-auth

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
```

## Production Deployment

### Docker Production Build

```bash
# Build production image
docker build -t nestjs-auth-backend .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=your-production-mongodb-uri \
  -e JWT_SECRET=your-production-jwt-secret \
  -e JWT_REFRESH_SECRET=your-production-refresh-secret \
  nestjs-auth-backend
```

## License

This project is licensed under the MIT License.