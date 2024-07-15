import { CancelSquare, CheckMarkSquareIcon } from "@/assets/icons/icons";
import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizOptionViewModel } from "@tajdid-academy/tajdid-corelib";
import { StyleSheet, View } from "react-native";

type SolutionOptionProps = {
  option: QuizOptionViewModel;
  index: number;
  userAnswerOptionId?: number;
};
export default function SolutionOption({
  option,
  index,
  userAnswerOptionId,
}: SolutionOptionProps) {
  const isSelectedOption = userAnswerOptionId === option.id;
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <View
      style={[
        styles.optionStyle,
        option?.isCorrect
          ? styles.correctStyle
          : isSelectedOption && !option?.isCorrect
          ? styles.incorrectStyle
          : styles.optionStyle,
      ]}
    >
      <Typography style={{ width: "92%" }}>
        {numberToDigitFormat(index + 1)} । {option?.content}
      </Typography>

      <View style={{ width: "8%" }}>
        {isSelectedOption && !option.isCorrect ? (
          <CancelSquare width={20} height={20} color={theme.colors.error600} />
        ) : (
          option?.isCorrect && (
            <CheckMarkSquareIcon
              width={20}
              height={20}
              color={theme.colors.success600}
            />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  correctStyle: {
    backgroundColor: theme.colors.success50,
    borderColor: theme.colors.success600,
  },
  incorrectStyle: {
    backgroundColor: theme.colors.error50,
    borderColor: theme.colors.error300,
  },
});
