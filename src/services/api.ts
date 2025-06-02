import { Player, PointHistory } from '../types';

function isValidPlayer(player: unknown): player is Player {
  if (!player || typeof player !== 'object') return false;
  
  return (
    'name' in player &&
    typeof (player as any).name === 'string' &&
    'field_points' in player &&
    typeof (player as any).field_points === 'string'
  );
}

export async function fetchLeaderboardData(): Promise<Player[]> {
  try {
    const response = await fetch('https://dev.acret2025.fun/api/player/exp');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our Player interface
    const validPlayers = Array.isArray(data) 
      ? data.map(player => ({
          alias: player.name,
          totalPoints: parseInt(player.field_points, 10)
        }))
      : [];
    
    if (validPlayers.length === 0) {
      console.warn('No valid player data received from API');
    }
    
    return validPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
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
      title: item.title[0].value,
      date: new Date(item.created[0].value).toLocaleDateString(),
      points: parseInt(item.field_deduction_points[0].value, 10)
    }));
  } catch (error) {
    console.error('Error fetching point history:', error);
    throw error;
  }
}