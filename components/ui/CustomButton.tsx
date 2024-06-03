import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Typography from "./Typography";

type CustomButtonProps = {
  children: React.ReactNode;
  active: boolean;
  buttonStyle?: "outline" | "inline";
  onPress: () => void;
  style?: ViewStyle;
};

export default function Button({
  children,
  active = false,
  buttonStyle = "outline",
  onPress,
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={!active}
      style={[
        style,
        styles.container,
        buttonStyle === "outline"
          ? [
              styles.outline,
              {
                borderColor: active
                  ? theme.colors.primaryDefault
                  : theme.colors.grayDefault,
              },
            ]
          : {
              backgroundColor: active
                ? theme.colors.primaryDefault
                : theme.colors.gray300,
            },
      ]}
      onPress={onPress}
    >
      <Typography
        weight="semiBold"
        size="base"
        color={
          buttonStyle === "outline"
            ? "primaryDefault"
            : active
            ? "white"
            : "grayDefault"
        }
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "100%",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    borderWidth: 1,
  },
});
