import MyCourseCard from "@/components/courses/MyCourseCard";
import Loader from "@/components/global/Loader";
import TopBar from "@/components/global/TopBar";
import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useGetEnrolledCourses } from "@/services/enrollmentService";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const MyCourses = () => {
  const [isOnGoingCourse, setIsOnGoingCourse] = useState(true);

  const { data, isLoading } = useGetEnrolledCourses();

  const completedCourses = data?.filter((item) => item?.status === "COMPLETED");
  const onGoingCourses = data?.filter((item) => item?.status !== "COMPLETED");

  return (
    <View style={styles.container}>
      {/* toggle course button */}
      <TopBar />
      <View style={styles.toggleCourse}>
        <View
          style={isOnGoingCourse ? styles.activeToggle : styles.inactiveToggle}
        >
          <TouchableOpacity onPress={() => setIsOnGoingCourse(true)}>
            <Typography
              weight={isOnGoingCourse ? "semiBold" : "medium"}
              color={isOnGoingCourse ? "primary700" : "gray500"}
              style={styles.toggleTextStyle}
            >
              অনগোয়িং কোর্স
            </Typography>
          </TouchableOpacity>
        </View>
        <View
          style={!isOnGoingCourse ? styles.activeToggle : styles.inactiveToggle}
        >
          <TouchableOpacity onPress={() => setIsOnGoingCourse(false)}>
            <Typography
              weight={!isOnGoingCourse ? "semiBold" : "medium"}
              color={!isOnGoingCourse ? "primary700" : "gray500"}
              style={styles.toggleTextStyle}
            >
              কমপ্লিটেড কোর্স
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* courses list */}
      {isLoading ? (
        <Loader style={{ marginTop: 200 }} />
      ) : (
        <FlatList
          data={isOnGoingCourse ? onGoingCourses : completedCourses}
          style={styles.courseCardContainer}
          renderItem={({ item, index }) => (
            <MyCourseCard
              course={item}
              key={index}
              isOnGoingCourse={isOnGoingCourse}
            />
          )}
        />
      )}
    </View>
  );
};
export default MyCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
  toggleCourse: {
    flexDirection: "row",
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  activeToggle: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary700,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveToggle: {
    flex: 1,
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleTextStyle: {
    fontSize: 16,
    paddingTop: 1,
    paddingHorizontal: 4,
    paddingBottom: 11,
    textAlign: "center",
  },
  courseCardContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
    marginBottom: 92,
  },
});
