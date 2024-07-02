import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizOptionViewModel } from "@tajdid-academy/tajdid-corelib";
import { Pressable, StyleSheet } from "react-native";

type OptionProps = {
  option: QuizOptionViewModel;
  index: number;
  handleSetQuizAnswer: (questionId: number, optionId: number) => void;
  isActive: boolean;
};

export default function Option({
  option,
  index,
  handleSetQuizAnswer,
  isActive,
}: OptionProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const handleOptionClick = () => {
    handleSetQuizAnswer(option.questionId, option.id);
  };

  return (
    <Pressable
      style={[
        styles.optionStyle,
        isActive ? styles.activeStyle : styles.deActiveStyle,
      ]}
      onPress={handleOptionClick}
    >
      <Typography>
        {numberToDigitFormat(index + 1)} । {option?.content}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  activeStyle: {
    backgroundColor: theme.colors.primary50,
    borderColor: theme.colors.primary600,
  },
  deActiveStyle: {
    backgroundColor: theme.colors.gray50,
    borderColor: theme.colors.gray100,
  },
});
