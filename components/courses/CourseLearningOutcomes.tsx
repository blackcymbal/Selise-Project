import theme from "@/constants/theme";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CustomHtmlList from "../global/CustomHtmlList";
import { Typography } from "../ui";

export default function CourseLearningOutcomes({
  whatWillLearn,
}: {
  whatWillLearn: CourseViewModel["whatWillLearn"];
}) {
  return (
    <View style={styles.container}>
      <Typography weight="semiBold" size="xl" color="gray900">
        কোর্সটি করে যা শিখবেন
      </Typography>
      <View style={styles.innerContainer}>
        <CustomHtmlList
          html={whatWillLearn as string}
          width={Dimensions.get("screen").width - 32}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  innerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    backgroundColor: theme.colors.gray50,
  },
});
