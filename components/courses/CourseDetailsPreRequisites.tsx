import React from "react";
import { View } from "react-native";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { Container, Typography } from "../ui";
import CourseCard from "./CourseCard";

type CourseDetailsPreRequisitesProps = {
  prerequisiteCourses: CourseViewModel[];
};

export default function CourseDetailsPreRequisites({
  prerequisiteCourses,
}: CourseDetailsPreRequisitesProps) {
  if (!prerequisiteCourses.length) {
    return null;
  }

  return (
    <Container px={0} gap={4}>
      <View>
        <Typography weight="semiBold" size="xl" color="gray900">
          শুরুর আগের শুরু
        </Typography>
        <Typography>
          কোর্স শুরু হবার আগে এই কোর্সগুলো অবশ্যই করে নিবেন। বিজয় আপনারই!
        </Typography>
      </View>
      {prerequisiteCourses.length > 0 &&
        prerequisiteCourses.map((item, index) => (
          <CourseCard key={index} course={item} />
        ))}
    </Container>
  );
}
