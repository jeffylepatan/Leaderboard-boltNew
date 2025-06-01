import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="mt-4 text-xl font-semibold text-indigo-600">Loading leaderboard data...</p>
    </div>
  );
};

export default LoadingState;