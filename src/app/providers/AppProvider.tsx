import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";

const DESIGN_WIDTH = 360;  // 너 Flutter에서 쓰던 기준으로 맞추면 됨
const DESIGN_HEIGHT = 800; // 대충 잡아도 됨 (필수는 아님)

type Theme = {
  bg: string;
  text: string;
  card: string;
  border: string;
};

type AppContextValue = {
  isDark: boolean;
  theme: Theme;
  // ScreenUtil처럼 쓰는 스케일 함수
  s: (size: number) => number;   // width 기준 스케일
  vs: (size: number) => number;  // height 기준 스케일
  ms: (size: number, factor?: number) => number; // 중간(가장 자주 씀)
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const { width, height } = useWindowDimensions();

  // Flutter ScreenUtil의 scale 개념을 RN에서 흉내
  const scaleW = width / DESIGN_WIDTH;
  const scaleH = height / DESIGN_HEIGHT;

  const theme: Theme = useMemo(
    () =>
      isDark
        ? { bg: "#000000", text: "#ffffff", card: "#141414", border: "#333333" }
        : { bg: "#ffffff", text: "#111111", card: "#f3f3f3", border: "#dddddd" },
    [isDark]
  );

  const value = useMemo<AppContextValue>(() => {
    const s = (size: number) => Math.round(size * scaleW);
    const vs = (size: number) => Math.round(size * scaleH);

    // moderate scale (실무에서 제일 무난)
    const ms = (size: number, factor: number = 0.5) =>
      Math.round(size + (s(size) - size) * factor);

    return { isDark, theme, s, vs, ms };
  }, [isDark, theme, scaleW, scaleH]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
