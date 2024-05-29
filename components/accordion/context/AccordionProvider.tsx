import { createContext, ReactNode, useContext, useState } from "react";

type AccordionContextType = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

type AccordionProviderProps = {
  children: ReactNode;
};

export default function AccordionProvider({
  children,
}: AccordionProviderProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <AccordionContext.Provider value={{ show, setShow }}>
      {children}
    </AccordionContext.Provider>
  );
}

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};
