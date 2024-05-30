import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

export default function CoursePayment() {
  const params = useLocalSearchParams();

  console.log(params.courseId);

  return (
    <>
      <ScrollView>
        <Text>CoursePayment</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
