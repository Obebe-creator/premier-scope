import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../../app/navigation/RootNavigator";
import { ROUTES } from "../../app/navigation/routes";
import { dummyMatches } from "../../utils/dummyMatches";

type Props = NativeStackScreenProps<RootStackParamList, "MatchList">;

export function MatchListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Match List
      </Text>

      <FlatList
        data={dummyMatches}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.MatchDetail, { matchId: item.id })
            }
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <Text style={{ fontSize: 12, opacity: 0.7 }}>{item.date}</Text>

            <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 6 }}>
              {item.homeTeam.shortName} {item.homeScore} : {item.awayScore}{" "}
              {item.awayTeam.shortName}
            </Text>

            <Text style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
              {item.stadium}
            </Text>

            <Text style={{ fontSize: 12, marginTop: 8 }}>
              Possession {item.stats.possessionHome}% - {item.stats.possessionAway}% ·
              SOT {item.stats.shotsOnTargetHome}-{item.stats.shotsOnTargetAway}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
