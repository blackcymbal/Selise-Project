import React from "react";
import { StyleSheet, View } from "react-native";
import { CourseCurriculum, groupBy } from "@tajdid-academy/tajdid-corelib";
import { Typography } from "@/components/ui";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import theme from "@/constants/theme";

type LessonCountProps = {
  curriculum: CourseCurriculum;
};

export default function LessonCount({ curriculum }: LessonCountProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const contentGroupByType = groupBy(curriculum?.contents, "type");

  return (
    <View style={styles.lessonCountContainer}>
      <Typography size="xs" color="gray600">
        {numberToDigitFormat(contentGroupByType?.LESSON?.length ?? 0)} টি ভিডিও
        লেসন
      </Typography>
      <View style={styles.dotStyle} />
      <Typography size="xs" color="gray600">
        {numberToDigitFormat(contentGroupByType?.RESOURCE?.length ?? 0)} টি
        ডকুমেন্ট
      </Typography>
      <View style={styles.dotStyle} />
      <Typography size="xs" color="gray600">
        {numberToDigitFormat(contentGroupByType?.QUIZ?.length ?? 0)} টি কুইজ
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  lessonCountContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  dotStyle: {
    width: 3,
    height: 3,
    borderRadius: 99,
    backgroundColor: theme.colors.gray400,
    marginTop: 5,
  },
});
