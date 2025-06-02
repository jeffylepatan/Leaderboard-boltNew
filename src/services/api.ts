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

    // Transform the data to match the PointHistory interface, with robust checks
    return Array.isArray(data) ? data.map((item: any) => {
      const title = item?.title ?? 'Untitled';
      // Extract datetime attribute from HTML string
      let date = 'Invalid Date';
      const createdHtml = item?.created;
      if (typeof createdHtml === 'string') {
        const match = createdHtml.match(/datetime=\"([^\"]+)\"/);
        if (match && match[1]) {
          const d = new Date(match[1]);
          date = isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
        }
      }
      const pointsRaw = item?.field_deduction_points;
      let points = 0;
      if (pointsRaw !== undefined && !isNaN(Number(pointsRaw))) {
        points = -parseInt(pointsRaw, 10); // Negative since these are deductions
      }
      return {
        title,
        date,
        points
      };
    }) : [];
  } catch (error) {
    console.error('Error fetching point history:', error);
    throw error;
  }
}