import { StyleSheet, View } from "react-native";
import {
  ActivityStatus,
  ActivityType,
  ValueOf,
} from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Typography } from "@/components/ui";
import {
  DocumentFIleIcon,
  LockedIcon,
  PlayCircleIcon,
  QuizIcon,
} from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { Link, usePathname } from "expo-router";
import { CourseUtils } from "@/utils/courseUtils";

type CurriculumModuleContentProps = {
  type: ValueOf<typeof ActivityType>;
  isFree?: boolean;
  label: string;
  id: number;
  slug: string;
  courseSlug: string;
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
  courseSlug,
  index,
  contentLength,
  moduleIndex,
  status,
}: CurriculumModuleContentProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const path = usePathname();
  const lessonSlug = decodeURIComponent(path.split("/")[5]);

  return (
    <View style={styles.iconAndLessonTitle}>
      <View style={{ zIndex: 1 }}>
        {type !== "QUIZ" && isFree ? (
          <View>
            {type === "LESSON" ? (
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.primary50 },
                ]}
              >
                <PlayCircleIcon width={20} height={20} />
              </View>
            ) : type === "RESOURCE" ? (
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.warning50 },
                ]}
              >
                <DocumentFIleIcon width={20} height={20} />
              </View>
            ) : (
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.purple50 },
                ]}
              >
                <QuizIcon width={20} height={20} />
              </View>
            )}
          </View>
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
              courseSlug,
              id.toString()
            )}
          >
            <Typography
              style={
                lessonSlug === id.toString()
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

        {type !== "QUIZ" && isFree && (
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
