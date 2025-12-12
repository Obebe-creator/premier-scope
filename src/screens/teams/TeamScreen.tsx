import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../app/navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Team">;

export function TeamScreen({ route }: Props) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Team</Text>
      <Text style={{ marginTop: 8 }}>teamId: {route.params?.teamId}</Text>
    </View>
  );
}
