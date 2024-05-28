import MyCourseCard from "@/components/courses/MyCourseCard";
import { Container, Typography } from "@/components/ui";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function OngoingCourses() {
  //TODO: Have to dynamic
  const onGoingCourse: Pick<CourseViewModel, "title">[] = [
    {
      title: "হজ্জ ও উমরাহ প্রশিক্ষণ ২০২৪",
    },
  ];

  return (
    <Container pt={5} gap={3} style={styles.container}>
      <View style={styles.onGoingContainer}>
        <Typography weight="bold" size="xl" color="gray900">
          অনগোয়িং কোর্স
        </Typography>
        <TouchableOpacity>
          <Typography weight="semiBold" size="sm" color="primary700">
            সব দেখুন
          </Typography>
        </TouchableOpacity>
      </View>
      {onGoingCourse.map((data, index) => (
        <MyCourseCard course={data} key={index} isOnGoingCourse={true} />
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: -4,
  },
  onGoingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
