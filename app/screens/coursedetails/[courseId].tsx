import courseDetailsBg from "@/assets/images/course-details-bg.png";
import {
  CourseCardPreview,
  CourseDetailsInstructors,
  CourseDetailsReviews,
  CourseDetailsTopBar,
  CourseLearningOutcomes,
  CoursePromo,
  CourseRequirements,
} from "@/components/courses";
import CourseDetailsCurriculum from "@/components/courses/CourseDetailsCurriculum";
import Loader from "@/components/global/Loader";
import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useGetCourse } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const CourseDetails = () => {
  const params = useLocalSearchParams();

  const { data: course, isLoading, error } = useGetCourse(params?.courseId);

  const promoUrl = course?.promoUrl;
  const videoId = promoUrl?.split("v=")?.[1];

  return (
    <>
      <CourseDetailsTopBar title={course?.title || params?.title} />
      {isLoading ? (
        <Loader style={styles.loader} />
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.heroSection}>
              <View style={styles.heroContent}>
                <Typography weight="bold" size="4xl" style={styles.heroTitle}>
                  {course?.title}
                </Typography>
                <Typography
                  weight="regular"
                  size="base"
                  color="body"
                  style={styles.heroSubTitle}
                >
                  {course?.description?.slice(0, 170)}...
                </Typography>
              </View>

              {!!promoUrl && (
                <CoursePromo
                  courseId={course?.id}
                  videoId={videoId as string}
                  thumbnail={course?.thumbnail as string}
                  player="youtube"
                />
              )}
            </View>

            <CourseCardPreview course={course as CourseViewModel} />

            <CourseDetailsCurriculum
              courseDetails={course as CourseViewModel}
            />

            <CourseDetailsInstructors
              instructors={course?.instructors}
              supportInstructors={course?.supportInstructors}
            />

            <CourseLearningOutcomes whatWillLearn={course?.whatWillLearn} />

            <CourseDetailsReviews />

            <CourseRequirements
              curriculumRequirement={course?.curriculumRequirement}
            />
          </View>

          <Image
            source={courseDetailsBg}
            resizeMode="cover"
            style={styles.courseDetailsBgStyle}
          />
        </ScrollView>
      )}
    </>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 100,
  },
  loader: { marginTop: 200 },
  heroSection: { flexDirection: "column", gap: 34 },
  heroContent: { flexDirection: "column", gap: 12 },
  heroTitle: {
    color: "#002A28",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  heroSubTitle: {
    textAlign: "center",
  },
  courseThumbnail: {
    width: "100%",
    height: 196,
    borderRadius: 16,
  },
  courseDetailsBgStyle: {
    width: "100%",
    position: "absolute",
  },
});
