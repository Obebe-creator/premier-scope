import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { getMatchById } from "../../utils/dummyMatches";

type Props = NativeStackScreenProps<RootStackParamList, "AiAnalysis">;

export function AiAnalysisScreen({ route }: Props) {
  const matchId = route.params?.matchId ?? 1;
  const match = getMatchById(matchId);

  const [loading, setLoading] = useState(true);

  const analysisText = useMemo(() => {
    if (!match) return "Match not found.";

    const { stats } = match;
    const homeBetterSot = stats.shotsOnTargetHome > stats.shotsOnTargetAway;
    const homeMorePoss = stats.possessionHome > stats.possessionAway;

    return [
      `Result: ${match.homeTeam.shortName} ${match.homeScore}-${match.awayScore} ${match.awayTeam.shortName}`,
      "",
      `Key points:`,
      `- ${homeMorePoss ? match.homeTeam.shortName : match.awayTeam.shortName} controlled possession (${stats.possessionHome}%-${stats.possessionAway}%).`,
      `- ${homeBetterSot ? match.homeTeam.shortName : match.awayTeam.shortName} created more threat on target (${stats.shotsOnTargetHome}-${stats.shotsOnTargetAway}).`,
      `- Corners (${stats.cornersHome}-${stats.cornersAway}) suggest set-piece pressure mattered.`,
      "",
      `AI summary: The match was decided by efficiency in key moments rather than raw volume. The side that converted chances and managed transitions better took the advantage.`,
    ].join("\n");
  }, [match]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700); // 서버 호출 느낌만
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 12 }}>
        AI Analysis
      </Text>

      {loading ? (
        <Text style={{ opacity: 0.7 }}>Generating analysis...</Text>
      ) : (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
          }}
        >
<Text style={{ lineHeight: 20 }}>
  {analysisText}
</Text>
        </View>
      )}
    </View>
  );
}
