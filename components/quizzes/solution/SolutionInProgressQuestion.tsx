import { StyleSheet, View } from "react-native";
import { Container, SectionDivider, Typography } from "@/components/ui";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizQuestionViewModel } from "@tajdid-academy/tajdid-corelib";
import SolutionOption from "./SolutionOption";
import { QuizAnswerViewModel } from "@/services/quizServices";

type SolutionInProgressQuestionProps = {
  question: QuizQuestionViewModel;
  index: number;
  numberOfQuestions?: number;
  quizAnswer: QuizAnswerViewModel[];
};

export default function SolutionInProgressQuestion({
  question,
  index = 2,
  numberOfQuestions,
  quizAnswer,
}: SolutionInProgressQuestionProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <>
      <View>
        <Typography weight="semiBold" mb={4}>
          প্রশ্ন {numberToDigitFormat(index + 1)} । {question?.content}
        </Typography>

        <Container gap={4} px={0}>
          {question.options?.map((option, index) => (
            <SolutionOption
              key={index}
              option={option}
              index={index}
              userAnswerOptionId={
                quizAnswer.find((item) => item.questionId === question.id)
                  ?.optionId
              }
            />
          ))}
          {index !== (numberOfQuestions ?? 0) - 1 && (
            <SectionDivider marginVertical={8} backgroundColor="gray200" />
          )}
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
