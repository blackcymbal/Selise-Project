import {
  DocumentFIleIcon,
  LockedIcon,
  PlayCircleIcon,
  QuizIcon,
} from "@/assets/icons/icons";
import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { useGetEnrolledCourses } from "@/services/enrollmentService";
import { CourseUtils } from "@/utils/courseUtils";
import {
  ActivityStatus,
  ActivityType,
  ValueOf,
} from "@tajdid-academy/tajdid-corelib";
import { Link, usePathname } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type CurriculumModuleContentProps = {
  type: ValueOf<typeof ActivityType>;
  isFree?: boolean;
  label: string;
  id: number;
  slug: string;
  courseId: number;
  index?: number;
  contentLength?: number;
  moduleIndex?: number;
  status?: ValueOf<typeof ActivityStatus>;
};

export default function CurriculumContent({
  type,
  isFree,
  label,
  id,
  slug,
  courseId,
  index,
  contentLength,
  moduleIndex,
  status,
}: CurriculumModuleContentProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const path = usePathname();
  const lessonId = decodeURIComponent(path.split("/")[5]);
  const { data: enrolledCourses } = useGetEnrolledCourses();
  const isEnrolled = enrolledCourses?.some(
    (item) => item?.course?.id === courseId
  );

  const typeToIconMap: Record<ValueOf<typeof ActivityType>, ReactNode> = {
    LESSON: (
      <View
        style={[
          styles.iconBgStyle,
          { backgroundColor: theme.colors.primary50 },
        ]}
      >
        <PlayCircleIcon />
      </View>
    ),
    QUIZ: (
      <View
        style={[styles.iconBgStyle, { backgroundColor: theme.colors.purple50 }]}
      >
        <QuizIcon />
      </View>
    ),
    RESOURCE: (
      <View
        style={[
          styles.iconBgStyle,
          { backgroundColor: theme.colors.warning50 },
        ]}
      >
        <DocumentFIleIcon />
      </View>
    ),
  };

  return (
    <View style={styles.iconAndLessonTitle}>
      <View style={{ zIndex: 1 }}>
        {isFree ? (
          <>{typeToIconMap[type]}</>
        ) : (
          <View
            style={[
              styles.iconBgStyle,
              { backgroundColor: theme.colors.gray100 },
            ]}
          >
            <LockedIcon width={20} height={20} color={theme.colors.gray400} />
          </View>
        )}
      </View>
      {index !== (contentLength ?? 0) - 1 && <View style={styles.dottedLine} />}
      <View style={{ width: "92%" }}>
        {isFree ? (
          <Link
            href={CourseUtils.curriculumContentTypeToLinkMap[type](
              courseId,
              id
            )}
          >
            <Typography
              style={
                Number(lessonId) === id
                  ? {
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                      textDecorationColor: theme.colors.primary600,
                      color: theme.colors.primary600,
                    }
                  : undefined
              }
            >
              {numberToDigitFormat(moduleIndex ?? 0)}.
              {numberToDigitFormat((index ?? 0) + 1)}. {label}
            </Typography>
          </Link>
        ) : (
          <Typography>
            {numberToDigitFormat(moduleIndex ?? 0)}.
            {numberToDigitFormat((index ?? 0) + 1)}. {label}
          </Typography>
        )}

        {type !== "QUIZ" && isFree && !isEnrolled && (
          <Typography px={1} color="white" style={styles.freeCourseLabel}>
            ফ্রি প্রিভিউ
          </Typography>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconAndLessonTitle: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  freeCourseLabel: {
    fontSize: 10,
    backgroundColor: theme.colors.success600,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  iconBgStyle: {
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  dottedLine: {
    height: "100%",
    position: "absolute",
    left: 14,
    top: 18,
    zIndex: 0,
    borderRightWidth: 1,
    // borderStyle: "dashed",
    borderRightColor: theme.colors.gray400,
  },
});
