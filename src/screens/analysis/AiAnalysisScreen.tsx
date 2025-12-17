import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { useApp } from "../../app/providers/AppProvider";
import { Card } from "../../components/common/Card";

import { fetchAnalysis } from "../../api/analysis.api";

type Props = NativeStackScreenProps<RootStackParamList, "AiAnalysis">;

export function AiAnalysisScreen({ route }: Props) {
  const { theme, ms } = useApp();
  const matchId = route.params?.matchId ?? 1;

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    setLoading(true);
    fetchAnalysis(matchId)
      .then((res) => {
        if (!alive) return;
        setText(res.text);
        setError(null);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message ?? "Failed to generate analysis");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [matchId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: ms(16) }}>
      <Text style={{ fontSize: ms(22), fontWeight: "800", marginBottom: ms(12), color: theme.text }}>
        AI Analysis
      </Text>

      {loading ? (
        <Text style={{ opacity: 0.7, color: theme.text }}>Generating analysis...</Text>
      ) : error ? (
        <Text style={{ opacity: 0.7, color: theme.text }}>{error}</Text>
      ) : (
        <Card>
          <Text style={{ lineHeight: ms(20), color: theme.text }}>{text}</Text>
        </Card>
      )}
    </View>
  );
}
