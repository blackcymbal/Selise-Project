import React from "react";
import { StyleSheet, View } from "react-native";
import { CourseCurriculum } from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Container, Typography } from "@/components/ui";
import {
  DocumentFIleIcon,
  LockedIcon,
  PlayCircleIcon,
  QuizIcon,
} from "@/assets/icons/icons";
import theme from "@/constants/theme";

type CurriculumModuleContentProps = {
  item: CourseCurriculum;
  moduleIndex?: number;
};

export default function CurriculumContent({
  item,
  moduleIndex,
}: CurriculumModuleContentProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <Container py={4} gap={4} style={styles.contentStyle}>
      {item?.contents?.map((content, idx) => (
        <View style={styles.iconAndLessonTitle} key={idx}>
          <View style={{ zIndex: 1 }}>
            {content.type !== "QUIZ" && content?.isFree === true ? (
              <View>
                {content?.type === "LESSON" ? (
                  <View
                    style={[
                      styles.iconBgStyle,
                      { backgroundColor: theme.colors.primary50 },
                    ]}
                  >
                    <PlayCircleIcon width={20} height={20} />
                  </View>
                ) : content?.type === "RESOURCE" ? (
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
                <LockedIcon
                  width={20}
                  height={20}
                  color={theme.colors.gray400}
                />
              </View>
            )}
          </View>
          {idx !== item?.contents.length - 1 && (
            <View style={styles.dottedLine} />
          )}
          <View style={{ width: "92%" }}>
            <Typography>
              {numberToDigitFormat((moduleIndex ?? 0) + 1)}.
              {numberToDigitFormat(idx + 1)}. {content?.title}
            </Typography>
            {content.type !== "QUIZ" && content?.isFree && (
              <Typography px={1} color="white" style={styles.freeCourseLabel}>
                ফ্রি প্রিভিউ
              </Typography>
            )}
          </View>
        </View>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
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
    borderStyle: "dashed",
    borderRightColor: theme.colors.gray400,
  },
});
