import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import AccordionProvider from './context/AccordionProvider';
import AccordionContent from './AccordionContent';
import AccordionItem from './AccordionItem';
import AccordionTrigger from './AccordionTrigger';

type AccordionProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Accordion({ children, style }: AccordionProps) {
  return (
    <AccordionProvider>
      <View style={style}>{children}</View>
    </AccordionProvider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
