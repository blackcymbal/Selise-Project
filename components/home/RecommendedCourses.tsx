import { useGetCourses } from "@/services/courseService";
import React from "react";
import { StyleSheet, View } from "react-native";
import CourseCard from "../courses/CourseCard";
import { Typography } from "../ui";

export default function RecommendedCourses() {
  const { data } = useGetCourses();

  const filteredCourses = data?.filter(
    (item) => item.id !== 59 && item.id !== 60
  );

  return (
    <View style={styles.container}>
      <Typography weight="bold" size="xl" color="gray900">
        রিকমেন্ডেড কোর্স
      </Typography>
      <View>
        {filteredCourses?.map((course, idx) => (
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
