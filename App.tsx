import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { RootNavigator } from "./src/app/navigation/RootNavigator";
import { AppProvider, useApp } from "./src/app/providers/AppProvider";

function AppShell() {
  const { isDark, theme } = useApp();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <RootNavigator />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
