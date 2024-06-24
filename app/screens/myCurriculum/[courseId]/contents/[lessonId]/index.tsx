import PlayYoutubeVideo from "@/components/PlayYoutubeVideo";
import { CourseDetailsTopBar } from "@/components/courses";
import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { useGetLessonDetails } from "@/services/LessonService";
import { useGetCourse } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function LessonDetailsScreen() {
  const { courseId, lessonId } = useLocalSearchParams();
  const { token } = useAuth();
  const { data } = useGetLessonDetails(lessonId ? +lessonId : undefined);
  const [playing, setPlaying] = useState(false);
  const videoId = data?.url?.split("v=")?.[1];

  const { data: courseDetails } = useGetCourse(
    courseId ? +courseId : undefined
  );

  if (!token) {
    return (
      <Redirect
        href={`/signIn?path=/screens/myCurriculum/${courseId}/contents/${lessonId}`}
      />
    );
  }

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
