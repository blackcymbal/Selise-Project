import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "./Typography";

type CustomButtonProps = {
  children: React.ReactNode;
  active: boolean;
  buttonStyle?: "outline" | "inline";
  onPress: () => void;
};

export default function Button({
  children,
  active = false,
  buttonStyle = "outline",
  onPress,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={!active}
      style={[
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
