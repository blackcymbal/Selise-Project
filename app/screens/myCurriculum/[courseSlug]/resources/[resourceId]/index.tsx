import { CourseDetailsTopBar } from "@/components/courses";
import { Container, Typography } from "@/components/ui";
import useAuth from "@/hooks/auth/useAuth";
import { useGetResourceDetails } from "@/services/courseService";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function ResourceDetailsScreen() {
  const { courseSlug, resourceId } = useLocalSearchParams();
  const resourceIdNumber = Number(resourceId);
  const { token } = useAuth();
  const { data } = useGetResourceDetails(resourceIdNumber);

  if (!token) {
    return (
      <Redirect
        href={`/signIn?path=/screens/myCurriculum/${courseSlug}/contents/${resourceId}`}
      />
    );
  }

  return (
    <>
      <CourseDetailsTopBar title={data?.title} />

      <ScrollView>
        <Container py={2} gap={2}>
          <Typography>{data?.title}</Typography>
        </Container>
      </ScrollView>
    </>
  );
}
