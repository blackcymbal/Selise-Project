import { LeadInstructor, SupportInstructor } from "@/assets/icons/icons";
import instructorsBg from "@/assets/images/instructors-bg.png";
import theme from "@/constants/theme";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Typography } from "../ui";
import CourseDetailsInstructorItem from "./CourseDetailsInstructorItem";

type CourseDetailsProps = {
  instructors?: CourseViewModel["instructors"];
  supportInstructors?: CourseViewModel["supportInstructors"];
};

export default function CourseDetailsInstructors({
  instructors,
  supportInstructors,
}: CourseDetailsProps) {
  return (
    <View style={styles.container}>
      <Typography weight="semiBold" size="xl" color="gray900">
        কোর্স ইন্সট্রাকটর
      </Typography>
      <ImageBackground
        source={instructorsBg}
        resizeMode="cover"
        style={styles.instructorsContainer}
      >
        <View style={{ gap: 8 }}>
          <View style={styles.heading}>
            <LeadInstructor width={20} height={20} />
            <Typography weight="semiBold" size="lg" color="primary700">
              লিড ইন্সট্রাকটর
            </Typography>
          </View>
          <View style={styles.inner}>
            {instructors?.map((instructor, index) => (
              <CourseDetailsInstructorItem
                instructor={instructor}
                key={index}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <View style={styles.heading}>
            <SupportInstructor width={20} height={20} />
            <Typography weight="semiBold" size="lg" color="primary700">
              সাপোর্ট ইন্সট্রাকটর
            </Typography>
          </View>
          <View style={styles.inner}>
            {supportInstructors?.map((supportInstructor, index) => (
              <CourseDetailsInstructorItem
                instructor={supportInstructor}
                key={index}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  instructorsContainer: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary600,
    paddingVertical: 20,
    paddingLeft: 12,
    paddingRight: 9,
    borderRadius: 8,
    gap: 16,
    backgroundColor: theme.colors.primary50,
  },
  heading: { flexDirection: "row", gap: 8, alignItems: "center" },
  inner: {
    padding: 16,
    gap: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  },
});
