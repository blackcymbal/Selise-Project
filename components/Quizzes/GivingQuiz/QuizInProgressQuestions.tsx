import { View } from "react-native";
import { QuizQuestionViewModel } from "@tajdid-academy/tajdid-corelib";
import { Container, SectionDivider, Typography } from "@/components/ui";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import Option from "./Option";

type QuizInProgressQuestionsProps = {
  question: QuizQuestionViewModel;
  index: number;
  numberOfQuestions?: number;
};

export default function QuizInProgressQuestions({
  question,
  index,
  numberOfQuestions,
}: QuizInProgressQuestionsProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <View>
      <Typography weight="semiBold" mb={4}>
        প্রশ্ন {numberToDigitFormat(index + 1)} । {question?.content}
      </Typography>

      <Container gap={4} px={0}>
        {question.options?.map((option, index) => (
          <Option option={option} index={index} key={option.id} />
        ))}
        {index !== (numberOfQuestions ?? 0) - 1 && (
          <SectionDivider marginVertical={8} backgroundColor="gray200" />
        )}
      </Container>
    </View>
  );
}
