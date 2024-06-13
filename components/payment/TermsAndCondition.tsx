import theme from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Container, Typography } from "../ui";

type TermsAndConditionProps = {
  isFreeCourse: boolean;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TermsAndCondition({
  isFreeCourse,
  isChecked,
  setIsChecked,
}: TermsAndConditionProps) {
  return (
    <Container gap={isFreeCourse ? 1 : 6}>
      {!isFreeCourse && (
        <Pressable
          onPress={() => setIsChecked(!isChecked)}
          style={{
            gap: 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={isChecked ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isChecked ? theme.colors.primary700 : theme.colors.gray200}
          />
          <Typography style={{ fontSize: 16 }}>
            আমি <Typography color="primary600">টার্মস এবং কন্ডিশনস</Typography>{" "}
            এর সাথে একমত
          </Typography>
        </Pressable>
      )}
      {isFreeCourse && (
        <Typography size="lg" mt={2} color="gray700">
          এই কোর্সটি ফ্রী, নিচের বাটনে ক্লিক করে কোর্সে এনরোল করুন এবং শেখা শুরু
          করুন
        </Typography>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({});
