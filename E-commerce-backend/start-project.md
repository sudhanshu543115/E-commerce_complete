# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or MongoDB Atlas account
- npm or yarn

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd src
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your values
   nano .env  # or use your preferred editor
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:9000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Test the Authentication System

1. **Open your browser** and go to `http://localhost:5173`

2. **Click "Create account"** to test user registration

3. **Fill out the signup form** with your details

4. **After successful registration**, you'll be automatically logged in

5. **Test the login flow** by logging out and logging back in

6. **Navigate to protected routes** like `/cart` or `/account/profile`

## API Testing

You can test the backend API endpoints using tools like Postman or curl:

### Register a new user:
```bash
curl -X POST http://localhost:9000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "mobile": "1234567890"
  }'
```

### Login:
```bash
curl -X POST http://localhost:9000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get user profile (requires token):
```bash
curl -X GET http://localhost:9000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Troubleshooting

### Backend Issues:
- Check if MongoDB is running
- Verify your `.env` file has correct values
- Check console for error messages

### Frontend Issues:
- Ensure backend is running on port 9000
- Check browser console for errors
- Verify all dependencies are installed

### Database Issues:
- Check MongoDB connection string
- Ensure database exists
- Check network connectivity if using MongoDB Atlas

## Next Steps

Once the basic authentication is working:

1. **Add more user fields** to the registration form
2. **Implement password reset** functionality
3. **Add email verification**
4. **Create admin user roles**
5. **Add product management**
6. **Implement shopping cart functionality**

## Support

If you encounter issues:
1. Check the console logs
2. Verify all environment variables are set
3. Ensure MongoDB is accessible
4. Check if ports 9000 and 5173 are available


