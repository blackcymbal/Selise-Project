import { StyleSheet, Text, View } from "react-native";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { QuizViewModel } from "@tajdid-academy/tajdid-corelib";

type QuizInProgressProps = {
  courseId: number | undefined;
  quizDetails: QuizViewModel;
};

export default function QuizInProgress({
  courseId,
  quizDetails,
}: QuizInProgressProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  console.log("quiz details : ", quizDetails);

  return (
    <View>
      <Text>QuizInProgress</Text>

      {/* <Container>
        <Typography>
          {numberToDigitFormat(
            CourseUtils.getTotalCompletedModule(courseDetails?.curriculum)
          )}
          /
          {numberToDigitFormat(
            CourseUtils.getTotalModules(courseDetails?.curriculum)
          )}{" "}
          মডিউল সম্পন্ন
        </Typography>
      </Container> */}
    </View>
  );
}

const styles = StyleSheet.create({});
