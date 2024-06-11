import CurriculumModule from "@/components/courses/course-curriculum/CurriculumModule";
import { Container, Typography } from "@/components/ui";
import {
  useGetCourseBySlug,
  useGetLessonDetails,
} from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";

export default function LessonDetailsScreen() {
  const params = useLocalSearchParams();
  const { data } = useGetLessonDetails(params?.lessonSlug);

  const { data: courseDetails } = useGetCourseBySlug(
    params?.courseSlug as string
  );

  return (
    <>
      <Typography>{data?.title}</Typography>
      <Container gap={4}>
        <Typography weight="semiBold" size="xl" color="gray900">
          কোর্স কারিকুলাম
        </Typography>
        <CurriculumModule courseDetails={courseDetails as CourseViewModel} />
      </Container>
    </>
  );
}
