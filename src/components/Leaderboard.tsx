import React, { useEffect, useState } from 'react';
import { Player, LeaderboardState, PointHistory } from '../types';
import { fetchLeaderboardData, fetchPointHistory } from '../services/api';
import PlayerCard from './PlayerCard';
import TopPlayers from './TopPlayers';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import PointHistoryList from './PointHistoryList';
import { Trophy } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [state, setState] = useState<LeaderboardState>({
    players: [],
    loading: true,
    error: null
  });
  const [history, setHistory] = useState<PointHistory[]>([]);

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const [playerData, historyData] = await Promise.all([
        fetchLeaderboardData(),
        fetchPointHistory()
      ]);
      
      setState({
        players: playerData,
        loading: false,
        error: null
      });
      setHistory(historyData);
    } catch (error) {
      setState({
        players: [],
        loading: false,
        error: 'Failed to load leaderboard data. Please try again.'
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.loading) {
    return <LoadingState />;
  }

  if (state.error) {
    return <ErrorState message={state.error} onRetry={fetchData} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn bg-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-100 mb-2 flex items-center justify-center">
          <Trophy className="w-8 md:w-10 h-8 md:h-10 mr-2 md:mr-3 text-yellow-500" />
          Acret Dev Leaderboard
        </h1>
        <p className="text-sm md:text-lg text-gray-400">Who will reach the top? The competition is fierce!</p>
      </header>

      {state.players.length >= 3 && (
        <TopPlayers players={state.players} />
      )}

      <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-md">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-100 border-b border-gray-600 pb-2">
          Full Rankings
        </h2>
        <div className="space-y-2">
          {state.players.map((player, index) => (
            <PlayerCard 
              key={`${player.alias}-${index}`}
              player={player}
              rank={index + 1}
            />
          ))}
        </div>
      </div>

      <PointHistoryList history={history} />
    </div>
  );
};

export default Leaderboard;