import theme from "@/constants/theme";
import { Pressable, StyleSheet } from "react-native";
import { Container, Typography } from "../ui";
import { CheckBoxSquare, UncheckSquare } from "@/assets/icons/icons";

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
          }}
        >
          {isChecked ? (
            <CheckBoxSquare
              width={16}
              height={16}
              color={theme.colors.primary500}
            />
          ) : (
            <UncheckSquare
              width={16}
              height={16}
              color={theme.colors.primary500}
            />
          )}
          <Typography size="sm">
            আমি{" "}
            <Typography size="sm" color="primary600">
              টার্মস এবং কন্ডিশনস
            </Typography>{" "}
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
