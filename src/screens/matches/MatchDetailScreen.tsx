import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { ROUTES } from "../../app/navigation/routes";
import { getMatchById } from "../../utils/dummyMatches";

type Props = NativeStackScreenProps<RootStackParamList, "MatchDetail">;

export function MatchDetailScreen({ route, navigation }: Props) {
  const matchId = route.params?.matchId ?? 1;
  const match = getMatchById(matchId);

  if (!match) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Match not found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 12, opacity: 0.7 }}>
        {match.date} · {match.stadium}
      </Text>

      <Text style={{ fontSize: 22, fontWeight: "800" }}>
        {match.homeTeam.name} {match.homeScore} : {match.awayScore}{" "}
        {match.awayTeam.name}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 14,
          gap: 6,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Stats</Text>
        <Text>
          Possession: {match.stats.possessionHome}% - {match.stats.possessionAway}%
        </Text>
        <Text>
          Shots: {match.stats.shotsHome} - {match.stats.shotsAway}
        </Text>
        <Text>
          Shots on Target: {match.stats.shotsOnTargetHome} - {match.stats.shotsOnTargetAway}
        </Text>
        <Text>
          Corners: {match.stats.cornersHome} - {match.stats.cornersAway}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.AiAnalysis, { matchId })}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#222",
          }}
        >
          <Text style={{ fontWeight: "700" }}>AI Analysis</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(ROUTES.Team, { teamId: 1 })}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Go to Team</Text>
        </Pressable>
      </View>
    </View>
  );
}
