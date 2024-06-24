import { CourseDetailsTopBar } from "@/components/courses";
import { Container, Typography } from "@/components/ui";
import useAuth from "@/hooks/auth/useAuth";
import { useGetResourceDetails } from "@/services/ResourceService";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function ResourceDetailsScreen() {
  const { courseId, resourceId } = useLocalSearchParams();
  const { token } = useAuth();
  const { data } = useGetResourceDetails(resourceId ? +resourceId : undefined);

  if (!token) {
    return (
      <Redirect
        href={`/signIn?path=/screens/myCurriculum/${courseId}/contents/${resourceId}`}
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
