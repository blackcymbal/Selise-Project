import React from "react";
import { StyleSheet, View } from "react-native";
import CourseCard from "../courses/CourseCard";
import { Typography } from "../ui";
import { useGetCourses } from "@/services/courseService";

export default function RecommendedCourses() {
  const { data: courses } = useGetCourses(true);

  return (
    <View style={styles.container}>
      <Typography weight="bold" size="xl" color="gray900">
        রিকমেন্ডেড কোর্স
      </Typography>
      <View>
        {courses?.slice(0, 3)?.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
});
