import {
  CourseDetailsTopBar,
  MyCourseContentNavigation,
} from "@/components/courses";
import { Container, Typography } from "@/components/ui";
import { useGetResourceDetails } from "@/services/ResourceService";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function ResourceDetailsScreen() {
  const { courseId, resourceId } = useLocalSearchParams();

  const { data } = useGetResourceDetails(resourceId ? +resourceId : undefined);

  return (
    <>
      <CourseDetailsTopBar title={data?.title} />

      <ScrollView>
        <Container py={2} gap={2}>
          <Typography>{data?.title}</Typography>
        </Container>
      </ScrollView>
      <MyCourseContentNavigation />
    </>
  );
}
