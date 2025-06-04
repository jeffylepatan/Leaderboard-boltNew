import React from 'react';
import Leaderboard from './components/Leaderboard';
import Fireflies from './components/Fireflies';
import MagicCircles from './components/MagicCircles';

function App() {
  return (
    <div className="min-h-screen bg-black from-indigo-100 to-purple-100 flex flex-col items-center justify-start py-8 relative">
      <MagicCircles />
      <Fireflies />
      <div className="relative z-10 w-full">
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;