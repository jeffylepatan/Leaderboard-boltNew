import { Player, PointHistory } from '../types';
import mockData from '../data/mockData.json';

function isValidPlayer(player: unknown): player is Player {
  if (!player || typeof player !== 'object') return false;
  
  return (
    'alias' in player &&
    typeof (player as Player).alias === 'string' &&
    'totalPoints' in player &&
    typeof (player as Player).totalPoints === 'number'
  );
}

export async function fetchLeaderboardData(): Promise<Player[]> {
  try {
    // Use mock data for development
    const validPlayers = (mockData as unknown[]).filter(isValidPlayer);
    
    if (validPlayers.length === 0) {
      console.warn('No valid player data received');
    }
    
    return validPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
    
    // Uncomment the following code when ready to use the real API
    /*
    const response = await fetch('/api/pointsystem/deductions');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate and filter the data to ensure only valid Player objects are returned
    const validPlayers = Array.isArray(data) 
      ? data.filter(isValidPlayer)
      : [];
    
    if (validPlayers.length === 0) {
      console.warn('No valid player data received from API');
    }
    
    return validPlayers;
    */
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
}

export async function fetchPointHistory(): Promise<PointHistory[]> {
  try {
    const response = await fetch('https://dev.acret2025.fun/api/pointsystem/deductions');

    if (!response.ok) {
      throw new Error(`Failed to fetch point history: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to match the PointHistory interface
    return data.map((item: any) => ({
      title: item.title,
      date: item.created.match(/datetime="(.*?)"/)?.[1].split('T')[0] || 'Invalid Date',
      points: parseInt(item.field_deduction_points, 10),
    }));
  } catch (error) {
    console.error('Error fetching point history:', error);
    throw error;
  }
}