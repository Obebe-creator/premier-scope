import type { Match } from "../types/match";
import { apiGet } from "./client";

type MatchListResponse = { items: Match[] };

export function fetchMatches() {
  return apiGet<MatchListResponse>("/matches");
}

export function fetchMatchDetail(id: number) {
  return apiGet<Match>(`/matches/${id}`);
}
