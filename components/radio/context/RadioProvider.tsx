import { createContext, ReactNode, useContext, useState } from "react";

type RadioContextType = {
  selected: string;
  setSelected: (value: string) => void;
};

export const RadioContext = createContext<RadioContextType | undefined>(
  undefined
);

type RadioProviderProps = {
  children: ReactNode;
};

export default function RadioProvider({ children }: RadioProviderProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <RadioContext.Provider value={{ selected, setSelected }}>
      {children}
    </RadioContext.Provider>
  );
}

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used within an RadioProvider");
  }
  return context;
};
