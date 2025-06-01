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
  // Mock data for point history
  return [
    { title: "Weekly Challenge Completion", date: "2025-03-01", points: 5 },
    { title: "Team Collaboration Bonus", date: "2025-03-01", points: 3 },
    { title: "Code Review Excellence", date: "2025-02-28", points: 2 },
    { title: "Bug Fix Champion", date: "2025-02-28", points: 4 },
    { title: "Documentation Hero", date: "2025-02-27", points: 3 },
    { title: "Performance Optimization", date: "2025-02-27", points: 5 },
    { title: "Mentoring Session", date: "2025-02-26", points: 4 },
    { title: "Feature Implementation", date: "2025-02-26", points: 5 },
    { title: "Code Quality Award", date: "2025-02-25", points: 3 },
    { title: "Testing Excellence", date: "2025-02-25", points: 4 },
    { title: "Security Enhancement", date: "2025-02-24", points: 5 },
    { title: "UI/UX Improvement", date: "2025-02-24", points: 3 },
    { title: "API Documentation", date: "2025-02-23", points: 4 },
    { title: "Code Refactoring", date: "2025-02-23", points: 3 },
    { title: "Team Support", date: "2025-02-22", points: 2 },
    { title: "Innovation Award", date: "2025-02-22", points: 5 },
    { title: "Sprint Goal Achievement", date: "2025-02-21", points: 4 },
    { title: "Knowledge Sharing", date: "2025-02-21", points: 3 },
    { title: "Code Review Participation", date: "2025-02-20", points: 2 },
    { title: "Bug Prevention", date: "2025-02-20", points: 4 },
    { title: "Documentation Update", date: "2025-02-19", points: 3 },
    { title: "Performance Monitoring", date: "2025-02-19", points: 4 },
    { title: "Team Collaboration", date: "2025-02-18", points: 3 },
    { title: "Code Quality Improvement", date: "2025-02-18", points: 4 },
    { title: "Security Review", date: "2025-02-17", points: 5 },
    { title: "Feature Planning", date: "2025-02-17", points: 3 },
    { title: "Testing Strategy", date: "2025-02-16", points: 4 },
    { title: "Code Optimization", date: "2025-02-16", points: 3 },
    { title: "Team Support Excellence", date: "2025-02-15", points: 4 },
    { title: "Innovation Initiative", date: "2025-02-15", points: 5 }
  ];
}