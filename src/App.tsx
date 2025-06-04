import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Leaderboard from './components/Leaderboard';
import Fireflies from './components/Fireflies';
import MagicCircles from './components/MagicCircles';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen bg-black from-indigo-100 to-purple-100 flex flex-col items-center justify-start py-8 relative">
        <MagicCircles />
        <Fireflies />
        <div className="relative z-10 w-full">
          {isAuthenticated ? (
            <Leaderboard />
          ) : (
            <Login onLogin={() => setIsAuthenticated(true)} />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}