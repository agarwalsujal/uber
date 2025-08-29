# Uber Clone - Full Stack Application

A comprehensive ride-hailing application built with modern web technologies, featuring separate user and captain (driver) authentication systems.

## 🚀 Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests
- **Cookie Parser** for session management

### Frontend

- **React 19** with Hooks
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router Dom** for navigation
- **Axios** for API requests

## 📁 Project Structure

```
uber/
├── backend/                 # Node.js Express API
│   ├── Controller/          # Route controllers
│   │   ├── captain.controller.js
│   │   └── user.controller.js
│   ├── Routes/              # API routes
│   │   ├── captain.routes.js
│   │   └── user.routes.js
│   ├── models/              # Database models
│   │   ├── blackListToken.js
│   │   ├── captain.model.js
│   │   └── user.model.js
│   ├── middlewares/         # Custom middlewares
│   │   └── isAuthenticated.js
│   ├── db/                  # Database configuration
│   │   └── db.js
│   ├── app.js               # Express app configuration
│   ├── server.js            # Server entry point
│   └── package.json
└── frontend/                # React Vite application
    ├── src/
    │   ├── pages/           # Page components
    │   │   ├── Home.jsx
    │   │   ├── UserLogin.jsx
    │   │   ├── UserSignUp.jsx
    │   │   ├── Captainlogin.jsx
    │   │   └── CaptainSignup.jsx
    │   ├── context/         # React context providers
    │   ├── assets/          # Static assets
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # React entry point
    ├── public/              # Public assets
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

4. Start the development server:

```bash
npm start
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔗 API Endpoints

### User Routes (`/api/users`)

- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `POST /logout` - User logout

### Captain Routes (`/api/captains`)

- `POST /register` - Captain registration
- `POST /login` - Captain login
- `GET /profile` - Get captain profile (protected)
- `POST /logout` - Captain logout

## 🎯 Features

### Completed Features

- ✅ User authentication (signup/login/logout)
- ✅ Captain authentication (signup/login/logout)
- ✅ JWT-based session management
- ✅ Password encryption
- ✅ Responsive design with TailwindCSS
- ✅ Route protection middleware
- ✅ Token blacklisting for secure logout

### Planned Features

- 🔄 Real-time ride booking
- 🔄 GPS location tracking
- 🔄 Payment integration
- 🔄 Ride history
- 🔄 Rating system
- 🔄 Admin dashboard

## 🚦 Getting Started

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd uber
```

2. **Setup Backend**

```bash
cd backend
npm install
# Create .env file with your configuration
npm start
```

3. **Setup Frontend** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/uber-clone

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

## 🧪 Development

### Backend Development

```bash
cd backend
npm start          # Start with nodemon (auto-reload)
```

### Frontend Development

```bash
cd frontend
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📱 Application Routes

- `/` - Home page
- `/user/signup` - User registration
- `/user/login` - User login
- `/captain/signup` - Captain registration
- `/captain/login` - Captain login

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- TailwindCSS for beautiful styling

---

**Note**: This is a learning project created for educational purposes. For production use, implement additional security measures, error handling, and testing.
