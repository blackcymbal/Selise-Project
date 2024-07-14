import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizViewModel } from "@tajdid-academy/tajdid-corelib";
import QuizInProgressQuestions from "./QuizInProgressQuestions";
import { Container, ProgressBar, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useEffect, useState } from "react";
import {
  QuizAnswerViewModel,
  useCreateBulkQuizAnswers,
  useUpdateBulkQuizAnswers,
} from "@/services/quizServices";
import { StopwatchIcon } from "@/assets/icons/icons";
import { formatTime } from "@/utils/formatTime";
import { router } from "expo-router";
import ShowAlert from "@/components/global/ShowAlert";
import { CourseUtils } from "@/utils/courseUtils";
import { useCompleteActivity } from "@/services/ActivityService";

type QuizInProgressProps = {
  courseId: number | undefined;
  quizDetails: QuizViewModel;
  numberOfQuestions?: number;
  quizActivityId?: number;
  myQuizAnswer: QuizAnswerViewModel[];
};

export default function QuizInProgress({
  courseId,
  quizDetails,
  numberOfQuestions,
  myQuizAnswer,
  quizActivityId,
}: QuizInProgressProps) {
  const [timer, setTimer] = useState(quizDetails.duration * 60);
  const [quizAnswer, setQuizAnswer] = useState<
    { questionId: number; optionId: number }[]
  >([]);
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const createBulkQuizAnswers = useCreateBulkQuizAnswers();
  const updateBulkQuizAnswers = useUpdateBulkQuizAnswers();
  const completeActivity = useCompleteActivity();

  const findAnswerIdByQuestionId = (questionId: number) => {
    const answer = myQuizAnswer.find((item) => item.questionId === questionId);
    return answer && answer.id;
  };

  const updatedQuizAnswer = quizAnswer.map(({ questionId, optionId }) => ({
    id: findAnswerIdByQuestionId(questionId),
    optionId,
  }));

  const filteredUpdateQuizAnswer = updatedQuizAnswer.filter(
    (item) => item.id !== undefined
  );

  const filteredUndefinedUpdateQuizAnswer = updatedQuizAnswer.filter(
    (item) => item.id === undefined
  );

  const newQuizAnswer = quizAnswer.filter((item) =>
    filteredUndefinedUpdateQuizAnswer.some(
      (answer) => answer.optionId === item.optionId
    )
  );

  const progress = ((quizAnswer.length / (numberOfQuestions ?? 0)) * 100) | 0;

  const handleSetQuizAnswer = (questionId: number, optionId: number) => {
    const existingAnswer = !!quizAnswer.find(
      (answer) => answer.questionId === questionId
    );

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmitQuizAnswers = async () => {
    if (!quizActivityId) {
      const data = {
        quizId: quizDetails?.id,
        answers: quizAnswer,
      };

      createBulkQuizAnswers.mutate(data, {
        onSuccess: (response) => {
          if (response) {
            router.replace(
              `${CourseUtils.curriculumContentTypeToLinkMap["QUIZ"](
                courseId ?? 0,
                quizDetails.id
              )}/result`
            );
          } else {
            ShowAlert({
              type: "Error",
              message: `Failed to submit quiz answers.`,
            });
          }
        },
      });
    } else if (quizActivityId && newQuizAnswer.length) {
      const data = {
        quizId: quizDetails?.id,
        answers: newQuizAnswer,
      };

      createBulkQuizAnswers.mutate(data, {
        onSuccess: (response) => {
          if (response) {
            completeActivity.mutate({
              activityId: quizActivityId,
              timeTaken: timer,
            });
            router.replace(
              `${CourseUtils.curriculumContentTypeToLinkMap["QUIZ"](
                courseId ?? 0,
                quizDetails.id
              )}/result`
            );
          } else {
            ShowAlert({
              type: "Error",
              message: `Failed to submit quiz answers.`,
            });
          }
        },
      });
    } else {
      const data = {
        answers: filteredUpdateQuizAnswer,
      };

      updateBulkQuizAnswers.mutate(data, {
        onSuccess: (response) => {
          if (response) {
            completeActivity.mutate({
              activityId: quizActivityId,
              timeTaken: timer,
            });
            router.replace(
              `${CourseUtils.curriculumContentTypeToLinkMap["QUIZ"](
                courseId ?? 0,
                quizDetails.id
              )}/result`
            );
          } else {
            ShowAlert({
              type: "Error",
              message: `Failed to submit quiz answers.`,
            });
          }
        },
      });
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
            progress={progress}
            width={180}
          />

          <View style={styles.timerContainer}>
            <Typography>
              {numberToDigitFormat(quizAnswer?.length)}/
              {numberToDigitFormat(numberOfQuestions ?? 0)}
            </Typography>
            <View style={styles.iconTimerContainer}>
              <StopwatchIcon
                width={16}
                height={16}
                color={theme.colors.primary600}
              />
              <Typography>{formatTime(timer)}</Typography>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitQuizAnswers}
        >
          <Typography color="white">শেষ করুন</Typography>
        </TouchableOpacity>
      </Container>

      <ScrollView>
        <Container p={4}>
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
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconTimerContainer: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: theme.colors.primary600,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
