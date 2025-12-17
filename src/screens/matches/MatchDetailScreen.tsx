import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { ROUTES } from "../../app/navigation/routes";

import { useApp } from "../../app/providers/AppProvider";
import { Card } from "../../components/common/Card";

import { fetchMatchDetail } from "../../api/matches.api";
import type { Match } from "../../types/match";

type Props = NativeStackScreenProps<RootStackParamList, "MatchDetail">;

export function MatchDetailScreen({ route, navigation }: Props) {
  const { theme, ms } = useApp();

  const matchId = route.params?.matchId ?? 1;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    setLoading(true);
    fetchMatchDetail(matchId)
      .then((m) => {
        if (!alive) return;
        setMatch(m);
        setError(null);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message ?? "Failed to load match detail");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [matchId]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, padding: ms(16) }}>
        <Text style={{ color: theme.text, opacity: 0.7 }}>Loading...</Text>
      </View>
    );
  }

  if (error || !match) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, padding: ms(16) }}>
        <Text style={{ color: theme.text, opacity: 0.7 }}>
          {error ?? "Match not found"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: ms(16) }}>
      <Text style={{ fontSize: ms(12), opacity: 0.7, color: theme.text }}>
        {match.date} · {match.stadium}
      </Text>

      <Text
        style={{
          fontSize: ms(22),
          fontWeight: "800",
          marginTop: ms(6),
          marginBottom: ms(14),
          color: theme.text,
        }}
      >
        {match.homeTeam.name} {match.homeScore} : {match.awayScore} {match.awayTeam.name}
      </Text>

      <Card>
        <Text
          style={{
            fontSize: ms(16),
            fontWeight: "700",
            marginBottom: ms(8),
            color: theme.text,
          }}
        >
          Match Stats
        </Text>

        <Text style={{ fontSize: ms(14), color: theme.text }}>
          Possession: {match.stats.possessionHome}% - {match.stats.possessionAway}%
        </Text>
        <Text style={{ fontSize: ms(14), marginTop: ms(4), color: theme.text }}>
          Shots: {match.stats.shotsHome} - {match.stats.shotsAway}
        </Text>
        <Text style={{ fontSize: ms(14), marginTop: ms(4), color: theme.text }}>
          Shots on Target: {match.stats.shotsOnTargetHome} - {match.stats.shotsOnTargetAway}
        </Text>
        <Text style={{ fontSize: ms(14), marginTop: ms(4), color: theme.text }}>
          Corners: {match.stats.cornersHome} - {match.stats.cornersAway}
        </Text>
      </Card>

      <View style={{ flexDirection: "row", gap: ms(10), marginTop: ms(16), flexWrap: "wrap" }}>
        <Pressable onPress={() => navigation.navigate(ROUTES.AiAnalysis, { matchId })}>
          <Card padding={10} radius={10}>
            <Text style={{ fontSize: ms(14), fontWeight: "700", color: theme.text }}>
              AI Analysis
            </Text>
          </Card>
        </Pressable>
      </View>
    </View>
  );
}
