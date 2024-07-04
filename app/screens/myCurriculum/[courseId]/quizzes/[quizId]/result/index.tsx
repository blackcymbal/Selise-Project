import { CourseDetailsTopBar } from "@/components/courses";
import ResultCard from "@/components/courses/quiz/ResultCard";
import ResultDetails from "@/components/courses/quiz/ResultDetails";
import ResultSummery from "@/components/courses/quiz/ResultSummery";
import { Container } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { useGetCourse } from "@/services/courseService";
import {
  useGetMyQuizAnswers,
  useGetQuizzesDetails,
} from "@/services/quizServices";
import { getEnrollmentStatus } from "@/utils/GetEnrollmentStatus";
import { getCurrentModuleAndContentInfo } from "@/utils/getCurrentModuleAndContentInfo";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function QuizResultScreen() {
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const { data: courseDetails } = useGetCourse(courseIdNumber);
  const { data: quizDetails, isPending } = useGetQuizzesDetails(quizIdNumber);
  const { data: myQuizAnswer } = useGetMyQuizAnswers(quizIdNumber);

  const isEnrolled = getEnrollmentStatus(courseIdNumber);

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const { currentModule, currentModuleIndex, contentIndex, content } =
    getCurrentModuleAndContentInfo(
      quizIdNumber,
      courseDetails?.curriculum ?? []
    );

  const calculateCorrectAnswers = () => {
    const correctAnswers = myQuizAnswer.filter((userAnswer) => {
      const question = quizDetails.questions.find(
        (q) => q.id === userAnswer.questionId
      );
      if (question) {
        const isCorrect = question?.options?.some(
          (option) => option.id === userAnswer.optionId && option.isCorrect
        );
        return isCorrect;
      }
      return false;
    });

    return correctAnswers.length;
  };

  const correctAnswersCount = calculateCorrectAnswers();
  const totalQuestions = quizDetails?.questions.length || 0;

  const acquiredScore = Math.round(
    (correctAnswersCount / totalQuestions) * 100
  );

  const wrongAnswer =
    quizDetails?.questions.length &&
    quizDetails?.questions.length - correctAnswersCount;

  const takenTime =
    quizDetails.duration * 60 -
    ((content?.type === "QUIZ" && content?.timeTaken) || 0);

  const isPassed = acquiredScore >= quizDetails.passMarks ? true : false;

  return (
    <View style={styles.container}>
      <CourseDetailsTopBar
        title={`কুইজ ফলাফল : ${numberToDigitFormat(
          currentModuleIndex ?? 0
        )}.${numberToDigitFormat(contentIndex ?? 0)} `}
      />
      <ResultSummery isPassed={isPassed} acquiredScore={acquiredScore} />

      <ResultDetails
        totalQuestion={totalQuestions}
        rightAnswer={correctAnswersCount}
        wrongAnswer={wrongAnswer}
        score={acquiredScore}
        takenTime={takenTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.white, height: "100%" },
});
