import { StyleSheet, View } from "react-native";
import {
  ActivityStatus,
  ActivityType,
  ValueOf,
} from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Typography } from "@/components/ui";
import {
  CheckMarkSquareIcon,
  DocumentFIleIcon,
  LockedIcon,
  PlayCircleIcon,
  QuizIcon,
} from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { Link, usePathname } from "expo-router";
import { CourseUtils } from "@/utils/courseUtils";
import { ReactNode } from "react";
import { getEnrollmentStatus } from "@/utils/GetEnrollmentStatus";

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

  const isEnrolled = getEnrollmentStatus(courseId);

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

  const statusToIconMap: Record<
    ValueOf<typeof ActivityStatus>,
    ReactNode | null
  > = {
    COMPLETED: (
      <CheckMarkSquareIcon
        color={theme.colors.success400}
        width={20}
        height={20}
      />
    ),
    IN_PROGRESS: null,
    NOT_STARTED: null,
  };

  return (
    <View style={styles.iconAndLessonTitle}>
      <View style={{ zIndex: 1 }}>
        {isEnrolled || isFree ? (
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
        {isEnrolled || isFree ? (
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
              {numberToDigitFormat((index ?? 0) + 1)}.{" "}
              {type === "QUIZ" ? "কুইজ" : label}
            </Typography>
          </Link>
        ) : (
          <Typography>
            {numberToDigitFormat(moduleIndex ?? 0)}.
            {numberToDigitFormat((index ?? 0) + 1)}.{" "}
            {type === "QUIZ" ? "কুইজ" : label}
          </Typography>
        )}

        {isFree && (
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
