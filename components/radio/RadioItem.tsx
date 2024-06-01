import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import theme from "@/constants/theme";
import Label from "./Label";

type RadioItemProps = {
  children: ReactNode;
  style?: ViewStyle;
  value: string;
  selected: string | null;
  setSelected: (value: string) => void;
};

export default function RadioItem({
  children,
  style,
  value,
  selected,
  setSelected,
}: RadioItemProps) {
  const isActive = selected === value;

  return (
    <Pressable onPress={() => setSelected(value)} style={style}>
      <View style={isActive ? styles.radioOutline : styles.radioDefault}>
        {isActive && <View style={styles.radioInner} />}
      </View>
      {children}
    </Pressable>
  );
}

RadioItem.Label = Label;

const styles = StyleSheet.create({
  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.primary600,
    backgroundColor: theme.colors.primary50,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary600,
  },
  radioDefault: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
});
