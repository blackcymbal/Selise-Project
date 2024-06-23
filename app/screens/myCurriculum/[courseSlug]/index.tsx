import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCourseBySlug } from "@/services/courseService";
import { CourseDetailsTopBar } from "@/components/courses";
import theme from "@/constants/theme";
import { Container, ProgressBar, Typography } from "@/components/ui";
import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { CourseUtils } from "@/utils/courseUtils";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import Loader from "@/components/global/Loader";

export default function MyCourseDetailsScreen() {
  const { courseSlug } = useLocalSearchParams();
  const { data: courseDetails, isPending } = useGetCourseBySlug(
    courseSlug as string
  );
  const { width: screenWidth } = Dimensions.get("window");
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <>
      <CourseDetailsTopBar title={courseDetails?.title} />

      {isPending ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={styles.bgWhite}>
          <Container pt={4} gap={4}>
            <View>
              <Typography weight="semiBold" size="xl" color="gray900">
                কোর্স কারিকুলাম
              </Typography>
              <ProgressBar
                progress={25}
                height={8}
                width={screenWidth - 75}
                color={theme.colors.primary700}
              />
              <Typography>
                {numberToDigitFormat(
                  CourseUtils.getTotalCompletedModule(courseDetails?.curriculum)
                )}
                /
                {numberToDigitFormat(
                  CourseUtils.getTotalModules(courseDetails?.curriculum)
                )}{" "}
                মডিউল সম্পন্ন
              </Typography>
            </View>

            <CurriculumModule
              courseDetails={courseDetails as CourseViewModel}
            />
          </Container>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: theme.colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
