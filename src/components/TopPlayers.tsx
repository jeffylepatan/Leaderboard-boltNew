import React from 'react';
import { Player } from '../types';
import { Trophy, Medal } from 'lucide-react';

interface TopPlayersProps {
  players: Player[];
}

const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
  if (players.length < 3) return null;
  
  const topThree = players.slice(0, 3);
  
  // Center the 1st place, put 2nd on left, 3rd on right
  return (
    <div className="w-full mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-900">Top Champions</h2>
      <div className="flex flex-col md:flex-row justify-center items-end gap-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 flex-1 md:flex-initial">
          <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg p-4 pt-6 pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-gray-500">
            <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 mb-2 shadow-inner">
              <Medal className="w-8 h-8 text-gray-700" />
            </div>
            <div className="text-2xl font-bold mb-1 text-gray-800">🥈 2nd Place</div>
            <div className="text-xl font-semibold mb-3 text-gray-800">{topThree[1].alias}</div>
            <div className="text-3xl font-bold text-gray-800">{topThree[1].totalPoints.toLocaleString()}</div>
            <div className="text-sm font-medium text-gray-700">points</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 flex-1 md:flex-initial md:mx-4 transform md:scale-110 z-10">
          <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-lg p-6 pt-8 pb-16 shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-yellow-600">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-yellow-200 mb-3 shadow-inner">
              <Trophy className="w-10 h-10 text-yellow-700" />
            </div>
            <div className="text-3xl font-bold mb-1 text-yellow-900">🥇 1st Place</div>
            <div className="text-2xl font-semibold mb-4 text-yellow-900">{topThree[0].alias}</div>
            <div className="text-4xl font-bold text-yellow-900">{topThree[0].totalPoints.toLocaleString()}</div>
            <div className="text-sm font-medium text-yellow-800">points</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 flex-1 md:flex-initial">
          <div className="bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg p-4 pt-6 pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-amber-800">
            <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-amber-500 mb-2 shadow-inner">
              <Medal className="w-8 h-8 text-amber-200" />
            </div>
            <div className="text-2xl font-bold mb-1 text-amber-100">🥉 3rd Place</div>
            <div className="text-xl font-semibold mb-3 text-amber-100">{topThree[2].alias}</div>
            <div className="text-3xl font-bold text-amber-100">{topThree[2].totalPoints.toLocaleString()}</div>
            <div className="text-sm font-medium text-amber-200">points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;