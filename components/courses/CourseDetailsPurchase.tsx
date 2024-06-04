import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Container, Typography } from "../ui";
import theme from "@/constants/theme";
import {
  CancelCircleIcon,
  DiscountIcon,
  StopwatchIcon,
  TicketPromoIcon,
} from "@/assets/icons/icons";
import { Link } from "expo-router";

type CoursePurchaseProps = {
  course: CourseViewModel;
};

export default function CourseDetailsPurchase({ course }: CoursePurchaseProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const discountPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  // TODO: have to dynamic
  const user = false;
  const isEnrolled = false;
  const [isViewPromo, setIsViewPromo] = useState(true);

  return (
    <View style={styles.purchaseContainer}>
      {!course?.isFree && (
        <View>
          {isViewPromo && (
            <>
              <Container
                flexDirection="row"
                gap={2}
                style={{
                  backgroundColor: theme.colors.primary700,
                  paddingVertical: 8,
                }}
              >
                <DiscountIcon
                  width={16}
                  height={16}
                  color={theme.colors.white}
                />
                <Typography weight="semiBold" size="sm" color="white">
                  EIDERKHUSHI
                </Typography>
                <Typography size="sm" color="white">
                  প্রোমো,
                </Typography>
                <Typography weight="semiBold" size="sm" color="white">
                  {numberToDigitFormat(course?.discount ?? 0)}% ডিসকাউন্ট,
                </Typography>
                <StopwatchIcon
                  width={16}
                  height={16}
                  color={theme.colors.white}
                />
                <Typography weight="semiBold" size="sm" color="white">
                  {"৩"} ঘ.
                </Typography>
                <TouchableOpacity
                  onPress={() => {
                    setIsViewPromo(false);
                  }}
                >
                  <CancelCircleIcon
                    width={16}
                    height={16}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              </Container>
            </>
          )}
        </View>
      )}

      <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {course?.isFree ? (
            <Typography weight="bold" size="lg" color="primary700">
              ফ্রি
            </Typography>
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Typography weight="bold" size="lg" color="primary700">
                ৳ {numberToDigitFormat(discountPrice)}
              </Typography>
              <Typography
                color="gray700"
                style={{
                  textDecorationLine: "line-through",
                }}
              >
                ৳ {numberToDigitFormat(course?.price)}
              </Typography>
            </View>
          )}
          {!course?.isFree ? (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TicketPromoIcon />
              <Typography weight="bold" color="primary700">
                এ্যাপ্লাই প্রমো কোড
              </Typography>
            </View>
          ) : (
            ""
          )}
        </View>
        <Link
          style={{
            backgroundColor: theme.colors.primary600,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
            textAlign: "center",
          }}
          href={isEnrolled ? "" : `/screens/payment/${course?.id}`}
        >
          <Typography weight="bold" color="white">
            {user && isEnrolled ? "চালিয়ে যান" : "কোর্সটি কিনুন"}
          </Typography>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  purchaseContainer: {
    backgroundColor: theme.colors.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
