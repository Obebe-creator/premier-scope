export const ROUTES = {
  MatchList: "MatchList",
  MatchDetail: "MatchDetail",
  Team: "Team",
  AiAnalysis: "AiAnalysis",
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
