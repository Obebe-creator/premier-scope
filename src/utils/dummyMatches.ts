import type { Match } from "../types/match";

export const dummyMatches: Match[] = [
  {
    id: 1,
    date: "2025-12-01",
    stadium: "Emirates Stadium",
    homeTeam: { id: "ARS", name: "Arsenal", shortName: "ARS" },
    awayTeam: { id: "MCI", name: "Manchester City", shortName: "MCI" },
    homeScore: 2,
    awayScore: 1,
    stats: {
      possessionHome: 54,
      possessionAway: 46,
      shotsHome: 14,
      shotsAway: 11,
      shotsOnTargetHome: 6,
      shotsOnTargetAway: 4,
      cornersHome: 5,
      cornersAway: 3,
    },
  },
  {
    id: 2,
    date: "2025-12-03",
    stadium: "Anfield",
    homeTeam: { id: "LIV", name: "Liverpool", shortName: "LIV" },
    awayTeam: { id: "CHE", name: "Chelsea", shortName: "CHE" },
    homeScore: 1,
    awayScore: 1,
    stats: {
      possessionHome: 58,
      possessionAway: 42,
      shotsHome: 17,
      shotsAway: 9,
      shotsOnTargetHome: 7,
      shotsOnTargetAway: 3,
      cornersHome: 8,
      cornersAway: 2,
    },
  },
  {
    id: 3,
    date: "2025-12-07",
    stadium: "Old Trafford",
    homeTeam: { id: "MUN", name: "Manchester United", shortName: "MUN" },
    awayTeam: { id: "TOT", name: "Tottenham", shortName: "TOT" },
    homeScore: 0,
    awayScore: 2,
    stats: {
      possessionHome: 49,
      possessionAway: 51,
      shotsHome: 10,
      shotsAway: 15,
      shotsOnTargetHome: 3,
      shotsOnTargetAway: 6,
      cornersHome: 4,
      cornersAway: 7,
    },
  },
];

export function getMatchById(matchId: number) {
  return dummyMatches.find((m) => m.id === matchId);
}
