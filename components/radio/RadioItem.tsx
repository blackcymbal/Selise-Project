import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode, useState } from "react";
import theme from "@/constants/theme";
import Label from "./Label";

type RadioItemProps = { children: ReactNode; style?: ViewStyle };

export default function RadioItem({ children, style }: RadioItemProps) {
  const [active, setActive] = useState(false);

  return (
    <Pressable onPress={() => setActive(!active)} style={style}>
      <View style={active ? styles.radioOutline : styles.radioDefault}>
        {active && <View style={styles.radioInner} />}
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
