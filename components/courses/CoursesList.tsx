import CourseCard from "@/components/courses/CourseCard";
import { useGetCourses } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Loader from "../global/Loader";
import { Typography } from "../ui";

type CourseCardProps = {
  item: Pick<
    CourseViewModel,
    "id" | "title" | "price" | "discount" | "isFree" | "thumbnail"
  >;
};

const headerComponent = () => (
  <Typography weight="bold" size="xl" color="gray900" my={3}>
    সকল কোর্সসমূহ
  </Typography>
);

const CoursesList = () => {
  const { data, isLoading } = useGetCourses();

  const renderItem = ({ item }: CourseCardProps) => (
    <CourseCard course={item} />
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={headerComponent}
        />
      )}
    </View>
  );
};

export default CoursesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loader: { marginTop: 200 },
});
