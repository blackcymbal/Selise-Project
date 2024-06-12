import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, SectionDivider, Typography } from "../ui";

export default function PaymentDetails({
  course,
}: {
  course: CourseViewModel;
}) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const discountPrice = course?.discount
    ? course?.price * (course?.discount / 100)
    : course?.price;
  const finalPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  return (
    <View>
      <Typography weight="semiBold" size="xl" color="gray900">
        পেমেন্ট ডিটেইলস
      </Typography>
      <Container px={0} mt={4} gap={2}>
        <View style={styles.rowCenterBetween}>
          <Typography size="lg" color="gray700">
            কোর্সের মূল্য
          </Typography>
          <Typography weight="semiBold" size="xl" color="gray700">
            ৳ {numberToDigitFormat(course?.price ?? 0)}
          </Typography>
        </View>
        <View style={styles.rowCenterBetween}>
          <Typography size="lg" color="gray700">
            ডিসকাউন্ট মূল্য
          </Typography>
          <Typography weight="semiBold" size="xl" color="gray700">
            ৳ {numberToDigitFormat(discountPrice ?? 0)}
          </Typography>
        </View>

        <SectionDivider />

        <View style={styles.rowCenterBetween}>
          <Typography weight="semiBold" size="xl">
            টোটাল পেমেন্ট
          </Typography>
          <Typography weight="semiBold" size="xl">
            ৳ {numberToDigitFormat(finalPrice ?? 0)}
          </Typography>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
