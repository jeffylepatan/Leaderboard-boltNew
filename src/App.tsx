import React from 'react';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center justify-start py-8">
      <Leaderboard />
    </div>
  );
}

export default App;