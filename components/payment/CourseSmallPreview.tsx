import { DocumentFIleIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { FilePathUtils, fallbackImages } from "@/utils";
import { CourseViewModel, groupBy } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Container, Typography } from "../ui";

export default function CourseSmallPreview({
  course,
}: {
  course: CourseViewModel;
}) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const contents = course?.curriculum?.flatMap((item) => item.contents) ?? [];
  const contentGroupByType = groupBy(contents, "type");
  return (
    <Container flexDirection="row" gap={4}>
      <Image
        source={{
          uri: course?.thumbnail
            ? `${FilePathUtils.courseImagePath(course?.id)}/${
                course?.thumbnail
              }`
            : fallbackImages.course,
        }}
        style={styles.image}
      />
      <View style={{ width: "60%" }}>
        <Typography size="lg" mb={2} color="gray900">
          {course?.title}
        </Typography>
        <View
          style={{
            gap: 4,
            flexDirection: "row",
          }}
        >
          <DocumentFIleIcon
            width={20}
            height={20}
            color={theme.colors.primary600}
          />
          <Typography>
            {numberToDigitFormat(contentGroupByType?.LESSON?.length ?? 0)}
            লেসন
          </Typography>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: 90,
    borderRadius: 8,
  },
});
