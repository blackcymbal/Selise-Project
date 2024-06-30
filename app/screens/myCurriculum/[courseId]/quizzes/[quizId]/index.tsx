import QuizDashboard from "@/components/Quizzes/GivingQuiz/QuizDashboard";
import { useGetQuizzesDetails } from "@/services/QuizService";
import { useGetCourse } from "@/services/courseService";
import { getEnrollmentStatus } from "@/utils/GetEnrollmentStatus";
import { QuizViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";

export default function QuizDetailsScreen() {
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const { data: courseDetails } = useGetCourse(courseIdNumber);
  const { data: quizDetails } = useGetQuizzesDetails(quizIdNumber);

  const isEnrolled = getEnrollmentStatus(courseIdNumber);

  return (
    <>
      <QuizDashboard
        isEnrolled={isEnrolled}
        curriculum={courseDetails?.curriculum}
        quizDetails={quizDetails as QuizViewModel}
        courseId={courseIdNumber}
      />
    </>
  );
}
