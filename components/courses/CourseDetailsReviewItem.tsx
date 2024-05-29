import { QuoteBgShape, QuoteIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Typography } from "../ui";

const { width: screenWidth } = Dimensions.get("window");

export type ReviewItemProps = {
  item: {
    id: number;
    name: string;
    image: string;
    position: string;
    content: string;
  };
};

export default function CourseDetailsReviewItem({ item }: ReviewItemProps) {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.quoteBgShapeStyle}>
        <QuoteBgShape />
      </View>

      <View style={styles.sliderHeaderContainer}>
        <View style={styles.imageAndTitleContainer}>
          <View style={styles.shadowProps}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <Typography weight="bold" color="gray900">
              {item.name}
            </Typography>
            <Typography size="sm" color="gray700">
              {item.position}
            </Typography>
          </View>
        </View>
        <View>
          <QuoteIcon width={32} height={32} />
        </View>
      </View>
      <Typography px={4} pb={5}>
        {item.content}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: screenWidth - 32,
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
  },
  quoteBgShapeStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  sliderHeaderContainer: {
    overflow: "hidden",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  imageAndTitleContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  shadowProps: {
    width: 54,
    height: 54,
    borderRadius: 54,
    elevation: 3, // for android
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 54,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
});
