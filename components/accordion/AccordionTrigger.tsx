import { Pressable, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { useAccordion } from "./context/AccordionProvider";
import AccordionTriggerIcon from "./AccordionTriggerIcon";
import AccordionTriggerContent from "./AccordionTriggerContent";

type AccordionTriggerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function AccordionTrigger({
  children,
  style,
}: AccordionTriggerProps) {
  const { show, setShow } = useAccordion();

  return (
    <Pressable style={style} onPress={() => setShow(!show)}>
      {children}
    </Pressable>
  );
}

AccordionTrigger.Icon = AccordionTriggerIcon;
AccordionTrigger.Content = AccordionTriggerContent;
