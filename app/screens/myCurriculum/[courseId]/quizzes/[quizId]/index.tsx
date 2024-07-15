import Loader from "@/components/global/Loader";
import QuizDashboard from "@/components/quizzes/giving-quiz/QuizDashboard";
import theme from "@/constants/theme";
import { useGetCourse } from "@/services/courseService";
import {
  useGetMyQuizAnswers,
  useGetQuizzesDetails,
} from "@/services/quizServices";
import { getEnrollmentStatus } from "@/utils/GetEnrollmentStatus";
import { QuizViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function QuizDetailsScreen() {
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const { data: courseDetails } = useGetCourse(courseIdNumber);
  const { data: quizDetails, isPending } = useGetQuizzesDetails(quizIdNumber);
  const { data: myQuizAnswer } = useGetMyQuizAnswers(quizIdNumber);

  const isEnrolled = getEnrollmentStatus(courseIdNumber);

  return (
    <View style={{ backgroundColor: theme.colors.white, height: "100%" }}>
      {isPending ? (
        <Loader style={styles.loaderContainer} />
      ) : (
        <QuizDashboard
          isEnrolled={isEnrolled}
          curriculum={courseDetails?.curriculum}
          quizDetails={quizDetails as QuizViewModel}
          courseId={courseIdNumber}
          moduleId={quizDetails?.moduleId}
          quizId={quizDetails?.id}
          myQuizAnswer={myQuizAnswer ?? []}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
