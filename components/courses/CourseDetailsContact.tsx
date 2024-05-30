import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import bgTexture from "@/assets/images/texture-radiating-surround-white-stripes-1.png";
import { Container, Typography } from "../ui";
import { PhoneCallIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";

export default function CourseDetailsContact() {
  return (
    <Container px={0} gap={4}>
      <Typography weight="semiBold" size="xl" color="gray900">
        আরও কোন জিজ্ঞাসা আছে?
      </Typography>
      <View style={styles.bgContainer}>
        <ImageBackground source={bgTexture} resizeMode="cover">
          <View style={styles.bgColorStyle}>
            <View style={styles.callIconStyle}>
              <PhoneCallIcon
                width={16}
                height={16}
                color={theme.colors.primaryDefault}
              />
            </View>
            <Typography weight="medium" color="white">
              কল করুন ০১৭৫৪৫৫৮৩১৩ নম্বরে
            </Typography>
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  bgColorStyle: {
    backgroundColor: theme.colors.primary600,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.85,
  },
  callIconStyle: {
    padding: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
  },
});
