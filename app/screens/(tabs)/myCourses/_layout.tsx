import { Stack } from "expo-router";
import React from "react";

export default function MyCoursesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="quizResult/[quizId]" />
      <Stack.Screen name="quizSolution/[quizId]" />
    </Stack>
  );
}
