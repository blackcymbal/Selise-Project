import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "./Typography";

const ProgressBar = ({
  progress,
  width,
  height,
  color,
}: {
  progress: number;
  width: number;
  height: number;
  color: string;
}) => {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <View style={styles.wholeView}>
      <View style={[styles.container, { width, height, borderRadius: height }]}>
        <View
          style={[
            styles.progressContainer,
            {
              width: `${progress}%`,
              backgroundColor: color,
              borderRadius: height,
            },
          ]}
        />
      </View>
      <Typography
        weight="bold"
        size="sm"
        style={{ color: color, ...styles.courseProgress }}
      >
        {numberToDigitFormat(progress)}%
      </Typography>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  wholeView: { flexDirection: "row", alignItems: "center" },
  container: {
    backgroundColor: theme.colors.gray200,
    overflow: "hidden",
  },
  progressContainer: {
    height: "100%",
  },
  courseProgress: {
    marginLeft: 10,
  },
});
