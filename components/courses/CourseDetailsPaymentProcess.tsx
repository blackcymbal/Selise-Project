import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Typography } from "../ui";
import { paymentSteps } from "./payment-steps";
import theme from "@/constants/theme";

export default function CourseDetailsPaymentProcess() {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <Container px={0} gap={4}>
      <Typography weight="semiBold" size="xl" color="gray900">
        যেভাবে পেমেন্ট করবেন
      </Typography>
      {paymentSteps.map((step, index) => (
        <View key={index} style={styles.stepsContainer}>
          <View style={styles.numberContainer}>
            <Typography weight="semiBold" color="primaryDefault">
              {numberToDigitFormat(index + 1)}
            </Typography>
          </View>
          {index !== paymentSteps.length - 1 && (
            <View style={styles.dottedLine} />
          )}
          <Typography>{step.description}</Typography>
        </View>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  stepsContainer: {
    gap: 12,
    flexDirection: "row",
    width: "90%",
    position: "relative",
  },
  numberContainer: {
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
    backgroundColor: theme.colors.primary50,
    marginTop: 1,
    zIndex: 1,
  },
  dottedLine: {
    height: "100%",
    position: "absolute",
    left: 11,
    top: 18,
    zIndex: 0,
    borderRightWidth: 1,
    borderStyle: "dashed",
    borderRightColor: theme.colors.primaryDefault,
  },
});
