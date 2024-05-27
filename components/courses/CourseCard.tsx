import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { FilePathUtils, fallbackImages } from "@/utils";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { File } from "../../assets/icons/icons";
import Typography from "../ui/Typography";

type CourseCardProps = {
  course: Pick<
    CourseViewModel,
    "id" | "title" | "price" | "discount" | "isFree" | "thumbnail"
  >;
};

export default function CourseCard({ course }: CourseCardProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const navigation = useNavigation();

  const discountPrice =
    course?.price -
    (course?.price * (course?.discount ? course?.discount : 0)) / 100;

  const handlePress = () => {
    navigation.navigate("CourseDetails", {
      id: course?.id,
      title: course?.title,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: course?.thumbnail
            ? `${FilePathUtils.courseImagePath(course?.id)}/${
                course?.thumbnail
              }`
            : fallbackImages.course,
        }}
        resizeMethod="auto"
        resizeMode="cover"
        style={styles.image}
      />
      <View style={{ padding: 10 }}>
        <Typography
          weight="semiBold"
          size="lg"
          color="gray900"
          style={styles.courseTitle}
        >
          {course?.title}
        </Typography>
        <View style={styles.lessonViewContainer}>
          <File height={16} width={16} color={theme.colors.gray700} />
          <Typography
            weight="regular"
            size="base"
            color="gray700"
            style={styles.countLessonText}
          >
            {numberToDigitFormat(10)} লেসন
          </Typography>
        </View>
        <View style={styles.divider} />
        {course?.isFree ? (
          <Typography weight="bold" size="2xl" color="primary700">
            ফ্রি
          </Typography>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Typography weight="bold" size="2xl" color="primary700">
              ৳ {numberToDigitFormat(discountPrice)}
            </Typography>
            <View style={styles.priceContainer}>
              <Typography
                weight="regular"
                size="base"
                color="gray700"
                style={styles.prevPrice}
              >
                ৳ {numberToDigitFormat(course?.price)}
              </Typography>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray50,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  courseTitle: {
    marginVertical: 5,
  },
  lessonViewContainer: { flexDirection: "row", alignItems: "center" },
  countLessonText: {
    marginHorizontal: 5,
    paddingTop: 5,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.gray200,
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  prevPrice: {
    paddingHorizontal: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
