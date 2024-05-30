import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type AccordionTriggerContentProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function AccordionTriggerContent({
  children,
  style,
}: AccordionTriggerContentProps) {
  return <View style={style}>{children}</View>;
}
