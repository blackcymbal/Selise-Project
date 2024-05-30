import { ReactNode, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import { useAccordion } from "./context/AccordionProvider";

type AccordionTriggerIconProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function AccordionTriggerIcon({
  children,
  style,
}: AccordionTriggerIconProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { show } = useAccordion();

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [show, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }], ...style }}>
      {children}
    </Animated.View>
  );
}
