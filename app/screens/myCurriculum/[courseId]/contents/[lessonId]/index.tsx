import PlayYoutubeVideo from "@/components/PlayYoutubeVideo";
import { CourseDetailsTopBar } from "@/components/courses";
import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useGetLessonDetails } from "@/services/LessonService";
import { useGetCourse } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function LessonDetailsScreen() {
  const [playing, setPlaying] = useState(false);
  const { courseId, lessonId } = useLocalSearchParams();
  const courseIdNumber = courseId ? +courseId : undefined;
  const lessonIdNumber = lessonId ? +lessonId : undefined;
  const { data: lessonDetails } = useGetLessonDetails(lessonIdNumber);
  const { data: courseDetails } = useGetCourse(courseIdNumber);

  const videoId = lessonDetails?.url?.split("v=")?.[1];

  return (
    <>
      <CourseDetailsTopBar title={lessonDetails?.title} />

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
