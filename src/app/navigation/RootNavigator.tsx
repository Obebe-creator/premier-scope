import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTES } from "./routes";

import { AiAnalysisScreen } from "../../screens/analysis/AiAnalysisScreen";
import { MatchDetailScreen } from "../../screens/matches/MatchDetailScreen";
import { MatchListScreen } from "../../screens/matches/MatchListScreen";
import { TeamScreen } from "../../screens/teams/TeamScreen";

export type RootStackParamList = {
  MatchList: undefined;
  MatchDetail: { matchId: number } | undefined;
  Team: { teamId: number } | undefined;
  AiAnalysis: { matchId: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.MatchList}>
        <Stack.Screen
          name={ROUTES.MatchList}
          component={MatchListScreen}
          options={{ title: "PremierScope" }}
        />
        <Stack.Screen
          name={ROUTES.MatchDetail}
          component={MatchDetailScreen}
          options={{ title: "Match" }}
        />
        <Stack.Screen
          name={ROUTES.Team}
          component={TeamScreen}
          options={{ title: "Team" }}
        />
        <Stack.Screen
          name={ROUTES.AiAnalysis}
          component={AiAnalysisScreen}
          options={{ title: "AI Analysis" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
