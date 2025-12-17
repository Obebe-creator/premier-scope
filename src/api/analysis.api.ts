import { apiPost } from "./client";

export type AnalysisResponse = {
  matchId: number;
  text: string;
};

export function fetchAnalysis(matchId: number) {
  return apiPost<AnalysisResponse>("/analysis", { matchId });
}
