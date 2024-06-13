import theme from "@/constants/theme";
import { useEffect, useRef, useState, type RefObject } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Container } from "../ui";

type OtpInputsProps = {
  getCodeFromInput: (codes: string[]) => void;
};

export default function OtpInputs({ getCodeFromInput }: OtpInputsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [codes, setCodes] = useState<string[]>(Array(4).fill(""));

  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    refs[0]?.current?.focus();
  }, []);

  const handleFocus = (index: number) => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  const onChangeCode = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);
    if (text !== "" && index < 3) {
      refs[index + 1]?.current?.focus();
    }

    getCodeFromInput(newCodes);
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      if ((index > 0 && index < 3) || (index === 3 && codes[3] === "")) {
        onChangeCode("", index - 1);
        refs[index - 1]?.current?.focus();
      } else if (index === 3 && codes[3] !== "") {
        onChangeCode("", index);
      }
    }
  };

  return (
    <Container flexDirection="row" style={styles.container}>
      {codes?.map((code, index) => (
        <TextInput
          key={index}
          autoComplete="one-time-code"
          editable={
            codes[index] === "" ||
            index === 3 ||
            (codes[index + 1] === "" && focusedIndex === index + 1)
          }
          style={[styles.input, focusedIndex === index && styles.focusedInput]}
          inputMode="numeric"
          onChangeText={(text) => onChangeCode(text, index)}
          value={code}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          maxLength={index === 0 ? codes?.length : 1}
          ref={refs[index]}
          onKeyPress={({ nativeEvent: { key } }) => onKeyPress(key, index)}
        />
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 32,
  },
  input: {
    fontSize: 16,
    fontFamily: "AnekBangla-SemiBold",
    height: 48,
    width: 75,
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    color: theme.colors.grayDefault,
    borderColor: theme.colors.gray300,
    borderWidth: 1,
  },
  focusedInput: {
    color: theme.colors.primaryDefault,
    borderColor: theme.colors.primaryDefault,
  },
});
