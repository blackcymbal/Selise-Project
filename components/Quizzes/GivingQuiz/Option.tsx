import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizOptionViewModel } from "@tajdid-academy/tajdid-corelib";
import { StyleSheet, TouchableOpacity } from "react-native";

type OptionProps = {
  option: QuizOptionViewModel;
  index: number;
  // handleSetQuizAnswer: (questionId: number, optionId: number) => void;
  // isActive: boolean;
};

export default function Option({ option, index }: OptionProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <TouchableOpacity style={styles.optionStyle}>
      <Typography>
        {numberToDigitFormat(index + 1)} । {option?.content}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    borderRadius: 8,
  },
});
