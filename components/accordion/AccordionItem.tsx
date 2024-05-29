import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type AccordionItemProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function AccordionItem({ children, style }: AccordionItemProps) {
  return <View style={style}>{children}</View>;
}
