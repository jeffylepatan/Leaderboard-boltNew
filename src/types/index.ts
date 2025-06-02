export interface Player {
  alias: string;
  totalPoints: number;
  avatar?: string;
  level?: number;
  playerName?: string;
}

export interface LeaderboardState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

export interface PointHistory {
  title: string;
  date: string;
  points: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}