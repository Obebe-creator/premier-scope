import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { ROUTES } from "../../app/navigation/routes";

import { useApp } from "../../app/providers/AppProvider";
import { Card } from "../../components/common/Card";

import { fetchMatches } from "../../api/matches.api";
import type { Match } from "../../types/match";

type Props = NativeStackScreenProps<RootStackParamList, "MatchList">;

export function MatchListScreen({ navigation }: Props) {
  const { theme, ms } = useApp();

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    setLoading(true);
    fetchMatches()
      .then((res) => {
        if (!alive) return;
        setMatches(res.items);
        setError(null);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message ?? "Failed to load matches");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: ms(16) }}>
      <Text
        style={{
          fontSize: ms(22),
          fontWeight: "700",
          marginBottom: ms(12),
          color: theme.text,
        }}
      >
        Match List
      </Text>

      {loading && (
        <Text style={{ color: theme.text, opacity: 0.7, marginBottom: ms(10) }}>
          Loading from server...
        </Text>
      )}

      {error && (
        <Text style={{ color: theme.text, opacity: 0.7, marginBottom: ms(10) }}>
          {error}
        </Text>
      )}

      <FlatList
        data={matches}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: ms(10) }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.MatchDetail, { matchId: item.id })
            }
          >
            <Card>
              <Text style={{ fontSize: ms(12), opacity: 0.7, color: theme.text }}>
                {item.date}
              </Text>

              <Text
                style={{
                  fontSize: ms(16),
                  fontWeight: "700",
                  marginTop: ms(6),
                  color: theme.text,
                }}
              >
                {item.homeTeam.shortName} {item.homeScore} : {item.awayScore}{" "}
                {item.awayTeam.shortName}
              </Text>

              <Text
                style={{
                  fontSize: ms(12),
                  marginTop: ms(6),
                  opacity: 0.7,
                  color: theme.text,
                }}
              >
                {item.stadium}
              </Text>

              <Text style={{ fontSize: ms(12), marginTop: ms(8), color: theme.text }}>
                Possession {item.stats.possessionHome}% - {item.stats.possessionAway}% ·
                SOT {item.stats.shotsOnTargetHome}-{item.stats.shotsOnTargetAway}
              </Text>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}
