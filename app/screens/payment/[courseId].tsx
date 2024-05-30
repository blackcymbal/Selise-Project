import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Typography } from "@/components/ui";
import { useGetCourse } from "@/services/courseService";
import theme from "@/constants/theme";

export default function CoursePayment() {
  const params = useLocalSearchParams();
  const { data: course, isLoading, error } = useGetCourse(params?.courseId);
  const [isChecked, setIsChecked] = useState(true);

  return (
    <>
      <ScrollView>
        <Container py={5} gap={6}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography weight="bold" size="lg">
              পেমেন্ট মাধ্যম
            </Typography>
            {!course?.isFree && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderColor: theme.colors.primary700,
                  borderRadius: 99,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  সম্পূর্ণ নিরাপদ পেমেন্ট
                </Text>
              </View>
            )}
          </View>

          {!course?.isFree && (
            <Pressable
              onPress={() => setIsChecked(!isChecked)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexDirection: "row",
              }}
            >
              <MaterialIcons
                name={isChecked ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={
                  isChecked ? theme.colors.primary700 : theme.colors.gray200
                }
              />
              <Typography style={{ fontSize: 16 }}>
                আমি{" "}
                <Typography color="primary600">টার্মস এবং কন্ডিশনস</Typography>{" "}
                এর সাথে একমত
              </Typography>
            </Pressable>
          )}

          {course?.isFree && (
            <Typography size="lg" mt={2} color="gray600">
              এই কোর্সটি ফ্রী, নিচের বাটনে ক্লিক করে কোর্সে এনরোল করুন এবং শেখা
              শুরু করুন
            </Typography>
          )}
        </Container>
        <Text>CoursePayment</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
