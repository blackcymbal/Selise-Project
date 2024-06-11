import { Typography } from "@/components/ui";
import { useGetLessonDetails } from "@/services/courseService";
import { useLocalSearchParams } from "expo-router";

export default function LessonDetailsScreen() {
  const params = useLocalSearchParams();
  const { data } = useGetLessonDetails(params?.lessonSlug);

  return (
    <>
      <Typography>{data?.title}</Typography>
    </>
  );
}
