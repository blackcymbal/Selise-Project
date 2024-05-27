import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { StyleSheet, View } from "react-native";
import CourseCard from "../courses/CourseCard";
import Typography from "../ui/Typography";

const courses: Pick<
  CourseViewModel,
  "id" | "title" | "price" | "discount" | "isFree" | "thumbnail"
>[] = [
  {
    id: 51,
    title: "হজ্জ এর বিস্তারিত পরিচয়",
    price: 100,
    discount: 20,
    isFree: true,
    thumbnail: "How-to-prepare-your-business-for-ramadan.jpg",
  },
  {
    id: 51,
    title: "হজরত মুহাম্মাদ (সাঃ) এর সিরাত",
    price: 100,
    discount: 20,
    isFree: false,
    thumbnail: "w-to-prepare-your-business-for-ramadan.jpg",
  },
  {
    id: 51,
    title: "হজ্জ এর বিস্তারিত পরিচয়",
    price: 100,
    discount: 20,
    isFree: false,
    thumbnail: "w-to-prepare-your-business-for-ramadan.jpg",
  },
];

export default function RecommendedCourses() {
  return (
    <View style={styles.container}>
      <Typography weight="bold" size="xl" color="gray900">
        রিকমেন্ডেড কোর্স
      </Typography>
      <View>
        {courses.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 80,
    gap: 12,
  },
});
