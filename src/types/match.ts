export type Team = {
  id: string;
  name: string;
  shortName: string;
};

export type MatchStats = {
  possessionHome: number; // %
  possessionAway: number; // %
  shotsHome: number;
  shotsAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
};

export type Match = {
  id: number;
  date: string; // "2025-12-12"
  stadium: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  stats: MatchStats;
};
