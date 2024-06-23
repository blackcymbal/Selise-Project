import PlayYoutubeVideo from "@/components/PlayYoutubeVideo";
import { CourseDetailsTopBar } from "@/components/courses";
import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import {
  useGetCourseBySlug,
  useGetLessonDetails,
} from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function LessonDetailsScreen() {
  const { courseSlug, lessonId } = useLocalSearchParams();
  const lessonIdNumber = Number(lessonId);
  const { token } = useAuth();
  const { data } = useGetLessonDetails(lessonIdNumber);
  const [playing, setPlaying] = useState(false);
  const videoId = data?.url?.split("v=")?.[1];

  const { data: courseDetails } = useGetCourseBySlug(courseSlug as string);

  useEffect(() => {
    if (!token) {
      router.navigate({
        pathname: "signIn",
        params: {
          path: `/screens/myCurriculum/${courseSlug}/contents/${lessonId}`,
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
          <Typography weight="semiBold" size="xl" color="gray900" px={4}>
            কোর্স কারিকুলাম
          </Typography>
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
