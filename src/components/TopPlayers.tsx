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
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-100">Top Champions</h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-2 md:gap-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 flex-1 md:flex-initial transform scale-90 md:scale-100">
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg p-3 md:p-4 pt-4 md:pt-6 pb-8 md:pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-gray-600">
            <div className="inline-flex justify-center items-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-gray-600 mb-1 md:mb-2 shadow-inner">
              <Medal className="w-6 md:w-8 h-6 md:h-8 text-gray-300" />
            </div>
            <div className="text-lg md:text-2xl font-bold mb-1 text-gray-300">🥈 2nd Place</div>
            <div className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-gray-300">{topThree[1].alias}</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-300">{topThree[1].totalPoints.toLocaleString()}</div>
            <div className="text-xs md:text-sm font-medium text-gray-400">points</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 flex-1 md:flex-initial md:mx-2 md:mx-4 transform scale-100 md:scale-110 z-10">
          <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-lg p-4 md:p-6 pt-6 md:pt-8 pb-12 md:pb-16 shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-yellow-800">
            <div className="inline-flex justify-center items-center w-12 md:w-16 h-12 md:h-16 rounded-full bg-yellow-800 mb-2 md:mb-3 shadow-inner">
              <Trophy className="w-8 md:w-10 h-8 md:h-10 text-yellow-300" />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-yellow-300">🥇 1st Place</div>
            <div className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-yellow-300">{topThree[0].alias}</div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">{topThree[0].totalPoints.toLocaleString()}</div>
            <div className="text-sm md:text-sm font-medium text-yellow-400">points</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 flex-1 md:flex-initial transform scale-90 md:scale-100">
          <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg p-3 md:p-4 pt-4 md:pt-6 pb-8 md:pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-amber-900">
            <div className="inline-flex justify-center items-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-amber-700 mb-1 md:mb-2 shadow-inner">
              <Medal className="w-6 md:w-8 h-6 md:h-8 text-amber-300" />
            </div>
            <div className="text-lg md:text-2xl font-bold mb-1 text-amber-300">🥉 3rd Place</div>
            <div className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-amber-300">{topThree[2].alias}</div>
            <div className="text-2xl md:text-3xl font-bold text-amber-300">{topThree[2].totalPoints.toLocaleString()}</div>
            <div className="text-xs md:text-sm font-medium text-amber-400">points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;