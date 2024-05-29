import { Typography } from "@/components/ui";
import { FilePathUtils, fallbackImages } from "@/utils";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export type InstructorsProps = {
  instructor: Pick<UserViewModel, "id" | "name" | "picture" | "designation">;
};

export default function CourseDetailsInstructorItem({
  instructor,
}: InstructorsProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: instructor?.picture
            ? `${FilePathUtils.userProfilePath(instructor.id)}/${
                instructor.picture
              }`
            : fallbackImages.user,
        }}
        style={styles.imageStyle}
      />
      <View style={{ width: "60%" }}>
        <Typography weight="semiBold" size="base" color="gray900">
          {instructor?.name}
        </Typography>
        <Typography weight="regular" size="sm" color="gray700">
          {instructor?.designation}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 16 },
  imageStyle: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
});
