import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizViewModel } from "@tajdid-academy/tajdid-corelib";
import QuizInProgressQuestions from "./QuizInProgressQuestions";
import { Container, ProgressBar, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useState } from "react";

type QuizInProgressProps = {
  courseId: number | undefined;
  quizDetails: QuizViewModel;
  numberOfQuestions?: number;
  quizActivityId?: number;
  myQuizAnswer: {
    id: number;
    quizId: number;
    questionId: number;
    optionId: number;
  }[];
};

export default function QuizInProgress({
  courseId,
  quizDetails,
  numberOfQuestions,
  myQuizAnswer,
  quizActivityId,
}: QuizInProgressProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const [quizAnswer, setQuizAnswer] = useState<
    { questionId: number; optionId: number }[]
  >([]);

  const handleSubmitQuiz = () => {
    console.log("clicked");
  };

  const handleSetQuizAnswer = (questionId: number, optionId: number) => {
    const existingAnswer = !!quizAnswer.find(
      (answer) => answer.questionId === questionId
    );

    console.log("quizAnswer: ", quizAnswer);

    if (existingAnswer) {
      setQuizAnswer(
        quizAnswer.map((answer) => {
          if (answer.questionId === questionId) {
            return {
              ...answer,
              optionId,
            };
          }
          return answer;
        })
      );
    } else {
      setQuizAnswer([...quizAnswer, { questionId, optionId }]);
    }
  };

  return (
    <>
      <Container
        gap={6}
        p={4}
        flexDirection="row"
        style={styles.progressContainer}
      >
        <View>
          <ProgressBar
            color={theme.colors.primary600}
            height={8}
            progress={25}
            width={170}
          />

          <View>
            <Typography>
              {numberToDigitFormat(2)}/
              {numberToDigitFormat(numberOfQuestions ?? 0)}
            </Typography>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Typography color="white">শেষ করুন</Typography>
        </TouchableOpacity>
      </Container>

      <ScrollView>
        <Container p={4} mb={36}>
          <Container gap={4} py={4} style={styles.container}>
            {quizDetails?.questions?.map((item, index) => (
              <QuizInProgressQuestions
                key={item.id}
                question={item}
                index={index}
                numberOfQuestions={numberOfQuestions}
                quizAnswer={quizAnswer}
                handleSetQuizAnswer={handleSetQuizAnswer}
              />
            ))}
          </Container>
        </Container>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    borderRadius: 8,
  },
  progressContainer: {
    justifyContent: "space-between",
    backgroundColor: theme.colors.gray50,
  },
  submitButton: {
    backgroundColor: theme.colors.primary600,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
