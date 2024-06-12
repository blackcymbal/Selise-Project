import { ArrowRight } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { EnrollmentViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { FilePathUtils, fallbackImages } from "@/utils";
import { ProgressBar, Typography } from "../ui";

type CourseCardProps = {
  course: Pick<EnrollmentViewModel, "course">;
  isOnGoingCourse: boolean;
};

export default function MyCourseCard({
  course,
  isOnGoingCourse,
}: CourseCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: course?.course?.thumbnail
              ? `${FilePathUtils.courseImagePath(course?.course?.id)}/${
                  course?.course?.thumbnail
                }`
              : fallbackImages.course,
          }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.courseContainer}>
          <Typography weight="semiBold" size="sm" color="gray900">
            {course?.course?.title.slice(0, 28)}{" "}
            {course?.course?.title.length >= 28 && "..."}
          </Typography>
          <ProgressBar
            progress={
              isOnGoingCourse
                ? course?.status === "NOT_STARTED"
                  ? 0
                  : 20
                : 100
            }
            height={8}
            width={173}
            color={theme.colors.primary700}
          />

          {isOnGoingCourse && (
            <View style={styles.button}>
              <Typography
                weight="semiBold"
                size="sm"
                color="primary700"
                style={styles.buttonText}
              >
                শুরু করুন
              </Typography>
              <ArrowRight color={theme.colors.primary700} />
            </View>
          )}
        </View>
        {!isOnGoingCourse && (
          <View style={styles.completedButton}>
            <Typography weight="semiBold" size="xs" color="white">
              কমপ্লিটেড
            </Typography>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    marginBottom: 24,
  },
  image: {
    height: 94,
    width: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  courseContainer: { flex: 2, paddingVertical: 8 },
  button: { flexDirection: "row", alignItems: "center" },
  buttonText: {
    marginRight: 2,
    marginTop: 4,
  },
  completedButton: {
    paddingHorizontal: 14,
    paddingTop: 6,
    backgroundColor: theme.colors.primary700,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: "flex-end",
  },
});
