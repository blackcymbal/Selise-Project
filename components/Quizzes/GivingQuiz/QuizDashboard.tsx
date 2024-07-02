import {
  CourseCurriculum,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import QuizInProgress from "./QuizInProgress";
import { CourseDetailsTopBar } from "@/components/courses";
import { useState } from "react";
import { QuizAnswerViewModel } from "@/services/quizServices";
import { Container, Typography } from "@/components/ui";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "@/constants/theme";
import { ArrowRight, InformationIcon } from "@/assets/icons/icons";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { createActivityForQuiz } from "@/services/ActivityService";
import { getCurrentModuleAndContentInfo } from "@/utils/getCurrentModuleContentInfo";

type QuizDashboardProps = {
  curriculum?: CourseCurriculum[];
  isEnrolled: boolean;
  quizDetails: QuizViewModel;
  courseId: number | undefined;
  moduleId: number | undefined;
  quizId: number | undefined;
  myQuizAnswer: QuizAnswerViewModel[];
};

export default function QuizDashboard({
  curriculum,
  isEnrolled,
  quizDetails,
  courseId,
  moduleId,
  quizId,
  myQuizAnswer,
}: QuizDashboardProps) {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [activityId, setActivityId] = useState<number>();

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const { currentModule, currentModuleIndex, contentIndex } =
    getCurrentModuleAndContentInfo(quizDetails.id, curriculum ?? []);

  const activityForQuiz = createActivityForQuiz();

  const content = curriculum
    ?.flatMap((module) => module.contents)
    .find((content) => content.id === quizId);
  // console.log("content :", content?.activityStatus);

  const handleStartQuiz = () => {
    setIsQuizActive(true);

    // activityForQuiz.mutate(
    //   {
    //     courseId,
    //     moduleId,
    //     quizId,
    //     type: "QUIZ",
    //   },
    //   {
    //     onSuccess: (response) => {
    //       if (response.status === "success") {
    //         setActivityId(response.data?.id);
    //       }
    //     },
    //   }
    // );
  };

  return (
    <>
      <CourseDetailsTopBar
        title={`কুইজ : ${numberToDigitFormat(
          currentModuleIndex ?? 0
        )}.${numberToDigitFormat(contentIndex ?? 0)} `}
      />

      {!isQuizActive ? (
        <>
          <Container gap={14} py={4}>
            <View>
              <Typography>
                {`কুইজ : ${numberToDigitFormat(
                  currentModuleIndex ?? 0
                )}.${numberToDigitFormat(contentIndex ?? 0)} `}{" "}
                : {currentModule?.title}
              </Typography>

              <Typography>
                টোটাল মার্ক:{" "}
                {numberToDigitFormat(quizDetails?.questions.length)}
              </Typography>

              <Typography>
                সময় কাল: {numberToDigitFormat(quizDetails?.duration)} মিনিট
              </Typography>

              <Typography>
                প্রশ্ন সংখ্যা:{" "}
                {numberToDigitFormat(quizDetails?.questions.length)}
              </Typography>

              <Typography>
                পাশ মার্ক: {numberToDigitFormat(quizDetails?.passMarks)}%
              </Typography>
            </View>
            <Container
              py={8}
              gap={4}
              flexDirection="column"
              style={styles.startContainer}
            >
              <InformationIcon />
              <Typography style={{ textAlign: "center" }}>
                আপনি পুনরায় কুইজটি দিতে পারবেন। সেক্ষেত্রে শেষবারের নাম্বারটি
                কাউন্ট হবে
              </Typography>

              <TouchableOpacity
                style={styles.quizStartButton}
                onPress={handleStartQuiz}
              >
                <Typography color="white">কুইজ শুরু করুন</Typography>
                <ArrowRight color={theme.colors.white} />
              </TouchableOpacity>
            </Container>
          </Container>
        </>
      ) : (
        <QuizInProgress
          courseId={courseId}
          quizDetails={quizDetails}
          numberOfQuestions={quizDetails?.questions.length}
          myQuizAnswer={myQuizAnswer}
          quizActivityId={activityId}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    backgroundColor: theme.colors.gray50,
    borderRadius: 8,
    alignItems: "center",
  },
  quizStartButton: {
    backgroundColor: theme.colors.primary600,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    width: "100%",
  },
});
