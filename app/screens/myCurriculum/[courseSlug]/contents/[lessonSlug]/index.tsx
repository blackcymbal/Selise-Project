import PlayYoutubeVideo from "@/components/PlayYoutubeVideo";
import { CourseDetailsTopBar } from "@/components/courses";
import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { Container, ProgressBar, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import {
  useGetCourseBySlug,
  useGetLessonDetails,
} from "@/services/courseService";
import { useGetEnrolledCourses } from "@/services/enrollmentService";
import { CourseUtils } from "@/utils/courseUtils";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

export default function LessonDetailsScreen() {
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const { data } = useGetLessonDetails(params?.lessonSlug);
  const [playing, setPlaying] = useState(false);
  const videoId = data?.url?.split("v=")?.[1];
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const { width: screenWidth } = Dimensions.get("window");
  const { data: enrolledCourse } = useGetEnrolledCourses();

  // TODO: Have to dynamic
  const isEnrolled = enrolledCourse?.length ? true : false;

  const { data: courseDetails } = useGetCourseBySlug(
    params?.courseSlug as string
  );

  useEffect(() => {
    if (!token) {
      router.navigate({
        pathname: "signIn",
        params: {
          path: `/screens/myCurriculum/${params?.courseSlug}/contents/${params?.lessonSlug}`,
        },
      });
    }
  }, []);

  return (
    <>
      <CourseDetailsTopBar title={data?.title} />

      <View style={styles.bgWhite}>
        <PlayYoutubeVideo
          videoId={videoId as string}
          playing={playing}
          setPlaying={setPlaying}
        />
      </View>

      <ScrollView style={styles.bgWhite}>
        <Container pt={4} gap={4}>
          <View>
            <Typography weight="semiBold" size="xl" color="gray900">
              কোর্স কারিকুলাম
            </Typography>
            {isEnrolled && (
              <>
                <ProgressBar
                  progress={25}
                  height={8}
                  width={screenWidth - 75}
                  color={theme.colors.primary700}
                />
                <Typography>
                  {numberToDigitFormat(
                    CourseUtils.getTotalCompletedModule(
                      courseDetails?.curriculum
                    )
                  )}
                  /
                  {numberToDigitFormat(
                    CourseUtils.getTotalModules(courseDetails?.curriculum)
                  )}{" "}
                  মডিউল সম্পন্ন
                </Typography>
              </>
            )}
          </View>
          <CurriculumModule courseDetails={courseDetails as CourseViewModel} />
        </Container>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: theme.colors.white,
  },
});
