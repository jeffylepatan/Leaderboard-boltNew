import React from 'react';
import { Player } from '../types';
import { Trophy, Medal, Gamepad2 } from 'lucide-react';

interface TopPlayersProps {
  players: Player[];
  rankingType: 'points' | 'vacation' | 'sick';
}

const TopPlayers: React.FC<TopPlayersProps> = ({ players, rankingType }) => {
  if (players.length < 3) return null;
  
  const topThree = players.slice(0, 3);

  const getValue = (player: Player) => {
    switch (rankingType) {
      case 'vacation':
        return player.vacationLeaveCredits || 0;
      case 'sick':
        return player.sickLeaveCredits || 0;
      default:
        return player.totalPoints;
    }
  };

  const getUnit = () => {
    switch (rankingType) {
      case 'vacation':
      case 'sick':
        return 'days';
      default:
        return 'points';
    }
  };
  
  return (
    <div className="w-full mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-100">Top Champions</h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-2 md:gap-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 flex-1 md:flex-initial transform scale-90 md:scale-100 animate-champion-card animate-champion-card-delay-1">
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg p-3 md:p-4 pt-4 md:pt-6 pb-8 md:pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-gray-600">
            {topThree[1].avatar ? (
              <img 
                src={topThree[1].avatar} 
                alt={topThree[1].playerName || topThree[1].alias}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-gray-600 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gray-600 flex items-center justify-center border-4 border-gray-500">
                <Gamepad2 className="w-8 h-8 text-gray-300" />
              </div>
            )}
            <div className="text-lg md:text-2xl font-bold mb-1 text-gray-300">🥈 2nd Place</div>
            <div className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-gray-300">
              {topThree[1].playerName || topThree[1].alias}
            </div>
            {topThree[1].level && (
              <div className="text-sm text-gray-400 mb-2">Level {topThree[1].level}</div>
            )}
            <div className="text-2xl md:text-3xl font-bold text-gray-300">{getValue(topThree[1]).toLocaleString()}</div>
            <div className="text-xs md:text-sm font-medium text-gray-400">{getUnit()}</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 flex-1 md:flex-initial md:mx-2 md:mx-4 transform scale-100 md:scale-110 z-10 animate-champion-card">
          <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-lg p-4 md:p-6 pt-6 md:pt-8 pb-12 md:pb-16 shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-yellow-800">
            {topThree[0].avatar ? (
              <img 
                src={topThree[0].avatar} 
                alt={topThree[0].playerName || topThree[0].alias}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-500 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-yellow-800 flex items-center justify-center border-4 border-yellow-500">
                <Trophy className="w-10 h-10 text-yellow-300" />
              </div>
            )}
            <div className="text-2xl md:text-3xl font-bold mb-1 text-yellow-300">🥇 1st Place</div>
            <div className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-yellow-300">
              {topThree[0].playerName || topThree[0].alias}
            </div>
            {topThree[0].level && (
              <div className="text-sm text-yellow-400 mb-2">Level {topThree[0].level}</div>
            )}
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">{getValue(topThree[0]).toLocaleString()}</div>
            <div className="text-sm md:text-sm font-medium text-yellow-400">{getUnit()}</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 flex-1 md:flex-initial transform scale-90 md:scale-100 animate-champion-card animate-champion-card-delay-2">
          <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg p-3 md:p-4 pt-4 md:pt-6 pb-8 md:pb-12 shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-amber-900">
            {topThree[2].avatar ? (
              <img 
                src={topThree[2].avatar} 
                alt={topThree[2].playerName || topThree[2].alias}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-amber-700 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-amber-700 flex items-center justify-center border-4 border-amber-600">
                <Medal className="w-8 h-8 text-amber-300" />
              </div>
            )}
            <div className="text-lg md:text-2xl font-bold mb-1 text-amber-300">🥉 3rd Place</div>
            <div className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-amber-300">
              {topThree[2].playerName || topThree[2].alias}
            </div>
            {topThree[2].level && (
              <div className="text-sm text-amber-400 mb-2">Level {topThree[2].level}</div>
            )}
            <div className="text-2xl md:text-3xl font-bold text-amber-300">{getValue(topThree[2]).toLocaleString()}</div>
            <div className="text-xs md:text-sm font-medium text-amber-400">{getUnit()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;