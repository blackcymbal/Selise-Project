import MyCourseCard from "@/components/courses/MyCourseCard";
import { Container, Typography } from "@/components/ui";
import { useGetEnrolledCourses } from "@/services/enrollmentService";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function OngoingCourses() {
  const { data } = useGetEnrolledCourses();
  const onGoingCourses = data?.filter((item) => item?.status !== "COMPLETED");

  return (
    <Container pt={5} gap={3} style={styles.container}>
      <View style={styles.onGoingContainer}>
        <Typography weight="bold" size="xl" color="gray900">
          অনগোয়িং কোর্স
        </Typography>
        <TouchableOpacity
          onPress={() => router.navigate("/screens/(tabs)/myCourses")}
        >
          <Typography weight="semiBold" size="sm" color="primary700">
            সব দেখুন
          </Typography>
        </TouchableOpacity>
      </View>
      {onGoingCourses?.slice(0, 1).map((data, index) => (
        <MyCourseCard
          course={data}
          key={index}
          courseId={data.course.id}
          isOnGoingCourse={true}
        />
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: -4,
  },
  onGoingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
