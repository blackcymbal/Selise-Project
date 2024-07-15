import {
  CourseCurriculum,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import QuizInProgress from "./QuizInProgress";
import { CourseDetailsTopBar } from "@/components/courses";
import { useState } from "react";
import { QuizAnswerViewModel } from "@/services/quizServices";
import { Container, Typography } from "@/components/ui";
import { StyleSheet, TouchableOpacity } from "react-native";
import theme from "@/constants/theme";
import {
  ArrowRight,
  FileUnknown,
  InformationIcon,
  Medal,
  Policy,
  StopwatchIcon,
} from "@/assets/icons/icons";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import ResultCard from "@/components/courses/quiz/ResultCard";
import { getCurrentModuleAndContentInfo } from "@/utils/getCurrentModuleAndContentInfo";
import { createActivityForQuiz, useGetActivityForACourse } from "@/services/ActivityService";


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

  const { data: myActivities } = useGetActivityForACourse(courseId);

  const quizActivityData = myActivities?.QUIZ
    ? myActivities?.QUIZ[`${quizId}`]
    : undefined;

  const activityForQuiz = createActivityForQuiz();

  const handleStartQuiz = () => {
    setIsQuizActive(true);

    if (!quizActivityData) {
      activityForQuiz.mutate(
        {
          courseId,
          moduleId,
          quizId,
          type: "QUIZ",
        },
        {
          onSuccess: (response) => {
            if (response.status === "success") {
              setActivityId(response.data?.id);
            }
          },
        }
      );
    } else {
      setActivityId(quizActivityData?.activityId);
    }
  };

  const quizData = [
    {
      icon: Policy,
      title: "টোটাল মার্ক",
      subTitle: numberToDigitFormat(quizDetails?.questions.length),
      iconColor: theme.colors.blue600,
      backgroundColor: theme.colors.blue50,
    },
    {
      icon: StopwatchIcon,
      title: "সময় কাল",
      subTitle: numberToDigitFormat(quizDetails?.duration),
      iconColor: theme.colors.purple600,
      backgroundColor: theme.colors.purple50,
    },
    {
      icon: FileUnknown,
      title: "প্রশ্নসংখ্যা",
      subTitle: numberToDigitFormat(quizDetails?.questions.length),
      iconColor: theme.colors.error600,
      backgroundColor: theme.colors.error50,
    },
    {
      icon: Medal,
      title: "পাশ মার্ক",
      subTitle: `${numberToDigitFormat(quizDetails?.passMarks)}%`,
      iconColor: theme.colors.cyan600,
      backgroundColor: theme.colors.cyan50,
    },
  ];

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
            <Container
              flexDirection="row"
              gap={5}
              px={0}
              py={4}
              style={{ justifyContent: "space-between", flexWrap: "wrap" }}
            >
              {quizData.map((item, idx) => (
                <ResultCard
                  key={idx}
                  Icon={item.icon}
                  title={item.title}
                  subTitle={item.subTitle.toString()}
                  iconColor={item.iconColor}
                  backgroundColor={item.backgroundColor}
                />
              ))}
            </Container>

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
