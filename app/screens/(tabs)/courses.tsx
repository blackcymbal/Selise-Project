import TopBar from "@/components/global/TopBar";
import React from "react";
import { StyleSheet, View } from "react-native";

import CoursesList from "@/components/courses/CoursesList";
import theme from "@/constants/theme";

export default function Courses() {
  return (
    <View style={styles.container}>
      <TopBar />
      <CoursesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
});
