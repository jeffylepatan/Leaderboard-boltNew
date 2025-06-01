import React from 'react';
import { Player } from '../types';
import { Trophy, Medal, Star } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  rank: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, rank }) => {
  // Basic styles for all cards
  const baseCardClasses = "flex items-center justify-between w-full p-4 rounded-lg shadow-md mb-3 transform transition-all duration-300 hover:scale-102 hover:shadow-lg";
  
  // Get appropriate styling based on rank
  const getRankStyling = () => {
    switch (rank) {
      case 1:
        return {
          cardClasses: `${baseCardClasses} bg-gradient-to-r from-amber-300 to-yellow-500 text-yellow-900`,
          icon: <Trophy className="w-6 h-6 mr-2 text-yellow-900" />,
          medal: "🥇",
          rankClasses: "font-bold text-2xl text-yellow-900"
        };
      case 2:
        return {
          cardClasses: `${baseCardClasses} bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800`,
          icon: <Medal className="w-6 h-6 mr-2 text-gray-800" />,
          medal: "🥈",
          rankClasses: "font-bold text-xl text-gray-800"
        };
      case 3:
        return {
          cardClasses: `${baseCardClasses} bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100`,
          icon: <Medal className="w-6 h-6 mr-2 text-amber-100" />,
          medal: "🥉",
          rankClasses: "font-bold text-xl text-amber-100"
        };
      default:
        return {
          cardClasses: `${baseCardClasses} bg-white hover:bg-gray-50 border border-gray-200`,
          icon: <Star className="w-5 h-5 mr-2 text-indigo-500 opacity-70" />,
          medal: "",
          rankClasses: "font-medium text-lg text-gray-700"
        };
    }
  };

  const { cardClasses, icon, medal, rankClasses } = getRankStyling();

  return (
    <div className={cardClasses}>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3">
          {icon}
        </div>
        <div>
          <div className={rankClasses}>
            {medal} Rank #{rank}
          </div>
          <div className="font-semibold text-lg">{player.alias}</div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-2xl font-bold">{player.totalPoints.toLocaleString()}</div>
        <span className="ml-1 text-sm font-medium">pts</span>
      </div>
    </div>
  );
};

export default PlayerCard;