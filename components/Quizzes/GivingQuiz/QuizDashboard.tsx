import {
  CourseCurriculum,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import QuizInProgress from "./QuizInProgress";
import { CourseDetailsTopBar } from "@/components/courses";

type QuizDashboardProps = {
  curriculum?: CourseCurriculum[];
  isEnrolled: boolean;
  quizDetails: QuizViewModel;
  courseId: number | undefined;
};

export default function QuizDashboard({
  curriculum,
  isEnrolled,
  quizDetails,
  courseId,
}: QuizDashboardProps) {
  return (
    <>
      <CourseDetailsTopBar title={quizDetails?.title} />

      <QuizInProgress
        courseId={courseId}
        quizDetails={quizDetails}
        numberOfQuestions={quizDetails?.questions.length}
      />
    </>
  );
}
