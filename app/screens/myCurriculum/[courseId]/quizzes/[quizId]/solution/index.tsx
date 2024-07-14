import { CourseDetailsTopBar } from "@/components/courses";
import SolutionInProgressQuestion from "@/components/quizzes/solution/SolutionInProgressQuestion";
import { Container } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { useGetCourse } from "@/services/courseService";
import {
  useGetMyQuizAnswers,
  useGetQuizzesDetails,
} from "@/services/quizServices";
import { getCurrentModuleAndContentInfo } from "@/utils/getCurrentModuleAndContentInfo";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function QuizSolutionScreen() {
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const { data: courseDetails } = useGetCourse(courseIdNumber);
  const { data: quizDetails, isPending } = useGetQuizzesDetails(quizIdNumber);
  const { data: myQuizAnswer } = useGetMyQuizAnswers(quizIdNumber);

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const { currentModule, currentModuleIndex, contentIndex, content } =
    getCurrentModuleAndContentInfo(
      quizIdNumber,
      courseDetails?.curriculum ?? []
    );

  return (
    <>
      <CourseDetailsTopBar
        title={`${numberToDigitFormat(
          currentModuleIndex ?? 0
        )}.${numberToDigitFormat(contentIndex ?? 0)} কুইজের বিস্তারিত সমাধান`}
      />

      <ScrollView style={{backgroundColor: theme.colors.white}}>
        <Container p={4}>
          <Container py={4} gap={4} style={styles.container}>
            {quizDetails?.questions?.map((item, index) => (
              <SolutionInProgressQuestion
                key={item.id}
                question={item}
                index={index}
                numberOfQuestions={quizDetails?.questions?.length}
                quizAnswer={myQuizAnswer ?? []}
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
    borderRadius: 8,
    borderColor: theme.colors.gray100,
  },
  footer: { height: 100 },
});
