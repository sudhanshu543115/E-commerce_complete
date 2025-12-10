# E-commerce Authentication System

This project implements a complete authentication system for an e-commerce application with both frontend and backend components.

## Features

### Backend (Node.js + Express + MongoDB)
- User registration and login with JWT authentication
- Password hashing using bcrypt
- MongoDB user model with validation
- RESTful API endpoints for authentication
- JWT token generation and validation

### Frontend (React + Tailwind CSS)
- Modern, responsive login and signup forms
- Authentication context for state management
- Protected routes for authenticated users
- User profile management
- Navigation with authentication-aware UI

## Project Structure

```
E-commercee/
├── src/                          # Backend source code
│   ├── config/                   # Database and JWT configuration
│   ├── controller/               # Authentication controllers
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── services/                 # Business logic
│   └── server.js                 # Express server
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── Customer/
│   │   │   ├── componants/
│   │   │   │   ├── Auth/         # Login & Signup components
│   │   │   │   ├── Profile/      # User profile component
│   │   │   │   └── Navigation/   # Navigation with auth
│   │   │   └── Pages/
│   │   ├── context/              # Authentication context
│   │   ├── components/           # Reusable components
│   │   ├── services/             # API service layer
│   │   └── Routers/              # Route configuration
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Install dependencies:
```bash
cd src
npm install
```

2. Configure environment variables:
Create a `.env` file in the `src` directory:
```env
PORT=9000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
```

3. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:9000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Protected Routes
- `/cart` - Shopping cart (requires authentication)
- `/checkout` - Checkout process (requires authentication)
- `/account/profile` - User profile (requires authentication)
- `/account/orders` - Order history (requires authentication)

## Authentication Flow

1. **Registration**: Users can create accounts with email, password, and personal information
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Upon successful authentication, a JWT token is issued
4. **Protected Routes**: Token is validated for accessing protected resources
5. **Logout**: Token is invalidated and user is logged out

## Frontend Components

### Login Component (`/login`)
- Email and password input fields
- Form validation
- Error handling
- Redirect to intended page after login

### Signup Component (`/signup`)
- Complete user registration form
- Password confirmation
- Form validation
- Automatic login after successful registration

### Profile Component (`/account/profile`)
- Display user information
- Edit profile functionality
- Update personal details

### Navigation Component
- Dynamic authentication-aware UI
- User avatar and dropdown menu
- Login/signup links for unauthenticated users
- Profile and logout options for authenticated users

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Client-side and server-side route protection
- **Input Validation**: Form validation and sanitization
- **CORS**: Cross-origin resource sharing configuration

## State Management

The application uses React Context API for authentication state management:

- **AuthContext**: Manages user authentication state
- **useAuth Hook**: Provides authentication functions and state
- **Local Storage**: Persists authentication tokens
- **Automatic Redirects**: Handles authentication flow redirects

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and professional interface
- **Interactive Elements**: Hover effects and transitions

## Error Handling

- **Form Validation**: Client-side validation with helpful error messages
- **API Error Handling**: Graceful handling of server errors
- **Network Error Handling**: User-friendly network error messages
- **Loading States**: Loading indicators for better UX

## Future Enhancements

- Password reset functionality
- Email verification
- Social media authentication
- Two-factor authentication
- Session management
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.


