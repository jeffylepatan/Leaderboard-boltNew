import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import Fireflies from './components/Fireflies';
import MagicCircles from './components/MagicCircles';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  // Skip authentication on localhost
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const [isAuthenticated, setIsAuthenticated] = React.useState(isLocalhost);

  return (
    <GoogleOAuthProvider clientId="969654797704-n5v2hp7b36ugonl9carbhq09rqppg1g0.apps.googleusercontent.com">
      <Router>
        <div className="min-h-screen bg-black from-indigo-100 to-purple-100 flex flex-col items-center justify-start py-8 relative">
          <MagicCircles />
          <Fireflies />
          <div className="relative z-10 w-full">
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/" element={isAuthenticated ? <Leaderboard /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;