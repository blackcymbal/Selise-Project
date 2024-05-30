import React, { ReactNode, useEffect, useRef, useState } from "react";
import { View, ViewStyle, Animated, Easing } from "react-native";
import { useAccordion } from "./context/AccordionProvider";

type AccordionContentProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function AccordionContent({
  children,
  style,
}: AccordionContentProps) {
  const { show } = useAccordion();
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: show ? contentHeight : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [show, contentHeight, animatedHeight]);

  return (
    <Animated.View style={[{ height: animatedHeight, overflow: "hidden" }]}>
      <View
        style={[style, { position: "absolute", top: 0, left: 0, right: 0 }]}
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        {children}
      </View>
    </Animated.View>
  );
}
