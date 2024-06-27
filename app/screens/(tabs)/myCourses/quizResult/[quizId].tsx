import { CourseDetailsTopBar } from "@/components/courses";
import ResultDetails from "@/components/courses/quiz/ResultDetails";
import ResultSummery from "@/components/courses/quiz/ResultSummery";
import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function QuizResult() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <CourseDetailsTopBar title={"কুইজ ফলাফল: ১.৭"} />
      <ResultSummery />
      <ResultDetails />
    </View>
  );
}

const styles = StyleSheet.create({});
