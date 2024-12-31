# Task Management Application (Frontend)

A modern, responsive task management application built with React, Vite, and TailwindCSS. This application provides separate interfaces for users and administrators to manage tasks efficiently.

## Core Features

### User Features
- 🔐 Secure authentication system
- 📝 Browse and manage tasks
- 🛒 User-friendly interface with real-time updates
- 📱 Responsive design for all devices
- 🔔 Real-time notifications using React Hot Toast

### Admin Features
- 📊 Comprehensive dashboard
- 👥 User management
- 📋 Task oversight and management
- 📈 Performance monitoring

## Tech Stack

- React 18
- Vite
- TailwindCSS
- React Router Dom
- Axios
- React Hot Toast

## Getting Started

### Prerequisites
- Node.js 14.0 or later
- npm or yarn

### Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd frontend
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── context/      # React Context providers
│   ├── pages/        # Page components
│   ├── services/     # API services
│   └── App.jsx       # Main application component
├── .env             # Environment variables
└── package.json     # Project dependencies
```


