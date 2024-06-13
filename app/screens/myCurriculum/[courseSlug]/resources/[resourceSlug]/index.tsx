import { CourseDetailsTopBar } from "@/components/courses";
import { Container, Typography } from "@/components/ui";
import useAuth from "@/hooks/auth/useAuth";
import { useGetResourceDetails } from "@/services/courseService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function ResourceDetailsScreen() {
  const { courseSlug, resourceSlug } = useLocalSearchParams();
  const { token } = useAuth();
  const { data } = useGetResourceDetails(resourceSlug as string);

  useEffect(() => {
    if (!token) {
      router.navigate({
        pathname: "signIn",
        params: {
          path: `/screens/myCurriculum/${courseSlug}/resources/${resourceSlug}`,
        },
      });
    }
  }, []);

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
