import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { useCreateTransactions } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";

type PaymentFooterProps = {
  isFreeCourse: boolean;
  course: CourseViewModel;
};

export default function PaymentFooter({
  isFreeCourse,
  course,
}: PaymentFooterProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const transactionsMutation = useCreateTransactions();
  const queryClient = useQueryClient();

  // const pathName = usePathname();

  const redirectUrl = Linking.createURL("/screens/(tabs)/myCourses");

  const finalPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  const handlePayment = () => {
    const requestBody = {
      courseId: course?.id,
      courseSlug: course?.slug,
      paymentMethod: "NAGAD",
      curriculumType: "COURSE",
      redirectUrl: redirectUrl,
    };
    transactionsMutation.mutate(requestBody, {
      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["enrolledCourse"] });
        if (data?.data?.redirectGatewayURL) {
          const result = await WebBrowser.openBrowserAsync(
            data?.data?.redirectGatewayURL
          );
          console.log(result);
        } else {
          router.replace("/screens/(tabs)/myCourses");
        }
      },
    });
  };

  useEffect(() => {
    const handleRedirect = (event: Linking.EventType) => {
      const { url } = event;
      console.log("Redirect URL:", url);

      // Parse the URL and extract needed data
      const parsedUrl = Linking.parse(url);
      console.log("parsedUrl data: ", parsedUrl);
      WebBrowser.dismissBrowser();
    };

    const subscription = Linking.addEventListener("url", handleRedirect);

    return () => subscription.remove();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
      }}
    >
      <View style={styles.rowCenterBetween}>
        <Typography weight="semiBold" size="sm">
          টোটাল পেমেন্ট
        </Typography>
        <Typography weight="semiBold" size="lg">
          ৳ {isFreeCourse ? "ফ্রি" : numberToDigitFormat(finalPrice ?? 0)}
        </Typography>
      </View>

      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: theme.colors.primary600,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 8,
        }}
        // disabled={
        //   finalPrice === 0 ? !isChecked : !isChecked || !paymentMethod
        // }
      >
        <Typography weight="bold" color="white" style={{ textAlign: "center" }}>
          {isFreeCourse ? "এখনই এনরোল করুন " : "পেমেন্ট সম্পন্ন করুন"}
        </Typography>
      </TouchableOpacity>
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
