import { CourseDetailsTopBar } from "@/components/courses";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { useGetCourse } from "@/services/courseService";
import {
  useGetMyQuizAnswers,
  useGetQuizzesDetails,
} from "@/services/quizServices";
import { getEnrollmentStatus } from "@/utils/GetEnrollmentStatus";
import { getCurrentModuleAndContentInfo } from "@/utils/getCurrentModuleAndContentInfo";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function QuizResultScreen() {
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const { data: courseDetails } = useGetCourse(courseIdNumber);
  const { data: quizDetails, isPending } = useGetQuizzesDetails(quizIdNumber);
  const { data: myQuizAnswer } = useGetMyQuizAnswers(quizIdNumber);

  const isEnrolled = getEnrollmentStatus(courseIdNumber);

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const { currentModule, currentModuleIndex, contentIndex } =
    getCurrentModuleAndContentInfo(
      quizIdNumber,
      courseDetails?.curriculum ?? []
    );

  console.log("My answer: ", myQuizAnswer);

  return (
    <View>
      <CourseDetailsTopBar
        title={`কুইজ ফলাফল : ${numberToDigitFormat(
          currentModuleIndex ?? 0
        )}.${numberToDigitFormat(contentIndex ?? 0)} `}
      />
      <Text>QuizResultScreen</Text>
    </View>
  );
}
