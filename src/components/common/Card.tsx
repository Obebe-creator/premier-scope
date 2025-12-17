import React from "react";
import { View, ViewProps } from "react-native";
import { useApp } from "../../app/providers/AppProvider";

type Props = ViewProps & {
  children: React.ReactNode;
  padding?: number; // 디자인 기준 값 (ms로 스케일됨)
  radius?: number;  // 디자인 기준 값 (ms로 스케일됨)
  border?: boolean;
};

export function Card({
  children,
  style,
  padding = 14,
  radius = 12,
  border = true,
  ...rest
}: Props) {
  const { theme, ms } = useApp();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: theme.card,
          padding: ms(padding),
          borderRadius: ms(radius),
          borderWidth: border ? 1 : 0,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
