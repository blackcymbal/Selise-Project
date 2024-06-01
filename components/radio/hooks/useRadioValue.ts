import { useState } from "react";

export default function useRadioValue() {
  const [selected, setSelected] = useState<string | null>(null);

  return { selected, setSelected };
}
