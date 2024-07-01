import {
  CourseCurriculum,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import QuizInProgress from "./QuizInProgress";
import { CourseDetailsTopBar } from "@/components/courses";
import { useState } from "react";

type QuizDashboardProps = {
  curriculum?: CourseCurriculum[];
  isEnrolled: boolean;
  quizDetails: QuizViewModel;
  courseId: number | undefined;
  myQuizAnswer: {
    id: number;
    quizId: number;
    questionId: number;
    optionId: number;
  }[];
};

export default function QuizDashboard({
  curriculum,
  isEnrolled,
  quizDetails,
  courseId,
  myQuizAnswer,
}: QuizDashboardProps) {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [activityId, setActivityId] = useState<number>();

  return (
    <>
      <CourseDetailsTopBar title={quizDetails?.title} />

      <QuizInProgress
        courseId={courseId}
        quizDetails={quizDetails}
        numberOfQuestions={quizDetails?.questions.length}
        myQuizAnswer={myQuizAnswer}
        quizActivityId={activityId}
      />
    </>
  );
}
