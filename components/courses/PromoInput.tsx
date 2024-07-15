import { CancelCircleIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import React, { RefObject, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";

type PromoInputProps = {
  setShowPromoInput: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromoInput({ setShowPromoInput }: PromoInputProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef: RefObject<TextInput> = useRef<TextInput>(null);

  const handleApply = () => {
    inputRef.current?.blur();
  };

  return (
    <View>
      <Typography color="gray700">প্রোমো কোড</Typography>
      <View style={styles.innerView}>
        <View style={styles.inputView}>
          <TextInput
            ref={inputRef}
            placeholder="আপনার প্রোমো কোডটি লিখুন"
            placeholderTextColor={theme.colors.gray500}
            style={[
              styles.inputField,
              {
                borderColor: isFocused
                  ? theme.colors.primary400
                  : theme.colors.gray300,
              },
            ]}
            onChangeText={(text) => setPromoCode(text)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Typography color="primaryDefault" weight="bold">
              এপ্লাই করুন
            </Typography>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShowPromoInput(false)}
          style={styles.closeButton}
        >
          <CancelCircleIcon height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerView: { flexDirection: "row", gap: 8 },
  inputView: { flexDirection: "row", flex: 9 },
  inputField: {
    flex: 5,
    fontSize: 16,
    fontFamily: "AnekBangla-Regular",
    color: theme.colors.gray900,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    padding: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  applyButton: {
    flex: 2,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
