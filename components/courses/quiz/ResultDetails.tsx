import {
  ArrowUpRight,
  FileUnknown,
  Medal,
  Policy,
  StopWatch,
} from "@/assets/icons/icons";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import ResultCard from "./ResultCard";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { formatTime } from "@/utils/formatTime";
import { CourseUtils } from "@/utils/courseUtils";

type ResultDetailsProps = {
  totalQuestion?: number;
  rightAnswer?: number;
  takenTime?: number;
  wrongAnswer?: number;
  score?: number;
};

export default function ResultDetails({
  totalQuestion,
  rightAnswer,
  takenTime,
  wrongAnswer,
  score,
}: ResultDetailsProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const { courseId, quizId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const quizIdNumber = quizId ? +quizId : undefined;

  const data = [
    {
      icon: Policy,
      title: "সঠিক উত্তর",
      subTitle: `${numberToDigitFormat(rightAnswer ?? 0)}/${numberToDigitFormat(
        totalQuestion ?? 0
      )}`,
      iconColor: theme.colors.blue600,
      backgroundColor: theme.colors.blue50,
    },
    {
      icon: StopWatch,
      title: "সময় নিয়েছেন",
      subTitle: formatTime(takenTime ?? 0),
      iconColor: theme.colors.purple600,
      backgroundColor: theme.colors.purple50,
    },
    {
      icon: FileUnknown,
      title: "ভুল উত্তর",
      subTitle: numberToDigitFormat(wrongAnswer ?? 0),
      iconColor: theme.colors.error600,
      backgroundColor: theme.colors.error50,
    },
    {
      icon: Medal,
      title: "অর্জিত স্কোর",
      subTitle: `${numberToDigitFormat(score ?? 0)}%`,
      iconColor: theme.colors.cyan600,
      backgroundColor: theme.colors.cyan50,
    },
  ];
  return (
    <>
      <Container flexDirection="row" gap={4} py={4} style={styles.container}>
        {data.map((item, idx) => (
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
      <Container mx={4} style={styles.footer}>
        <Link
          href={`${CourseUtils.curriculumContentTypeToLinkMap["QUIZ"](
            courseIdNumber ?? 0,
            quizIdNumber ?? 0
          )}/solution`}
        asChild>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Typography weight="semiBold" color="primary700">
              সমাধানের বিস্তারিত দেখুন
            </Typography>
            <ArrowUpRight height={20} color={theme.colors.primary700} />
          </TouchableOpacity>
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexWrap: "wrap" },
  footer: {
    height: 84,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
