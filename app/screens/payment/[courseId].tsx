import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, SectionDivider, Typography } from "@/components/ui";
import { useGetCourse } from "@/services/courseService";
import theme from "@/constants/theme";
import TopBar from "@/components/global/TopBar";
import { DocumentFIleIcon, LockIcon } from "@/assets/icons/icons";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { groupBy } from "@tajdid-academy/tajdid-corelib";
import { FilePathUtils, fallbackImages } from "@/utils";

export default function CoursePayment() {
  const params = useLocalSearchParams();
  const { data: course, isLoading, error } = useGetCourse(params?.courseId);
  const [isChecked, setIsChecked] = useState(true);

  const contents = course?.curriculum?.flatMap((item) => item.contents) ?? [];
  const contentGroupByType = groupBy(contents, "type");

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const discountPrice = course?.discount
    ? course?.price * (course?.discount / 100)
    : course?.price;
  const finalPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  return (
    <>
      <TopBar />
      <ScrollView style={{ backgroundColor: theme.colors.white }}>
        <Container
          py={5}
          gap={course?.isFree ? 1 : 6}
          style={{ backgroundColor: theme.colors.gray50 }}
        >
          <View style={styles.rowCenterBetween}>
            <Typography weight="bold" size="xl">
              পেমেন্ট মাধ্যম
            </Typography>
            {!course?.isFree && (
              <View style={styles.paymentTag}>
                <LockIcon
                  width={16}
                  height={16}
                  color={theme.colors.primary600}
                />
                <Typography size="sm" color="primary600">
                  সম্পূর্ণ নিরাপদ পেমেন্ট
                </Typography>
              </View>
            )}
          </View>

          {!course?.isFree && (
            <Pressable
              onPress={() => setIsChecked(!isChecked)}
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={isChecked ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={
                  isChecked ? theme.colors.primary700 : theme.colors.gray200
                }
              />
              <Typography style={{ fontSize: 16 }}>
                আমি{" "}
                <Typography color="primary600">টার্মস এবং কন্ডিশনস</Typography>{" "}
                এর সাথে একমত
              </Typography>
            </Pressable>
          )}

          {course?.isFree && (
            <Typography size="lg" mt={2} color="gray700">
              এই কোর্সটি ফ্রী, নিচের বাটনে ক্লিক করে কোর্সে এনরোল করুন এবং শেখা
              শুরু করুন
            </Typography>
          )}
        </Container>

        <Container
          pt={6}
          pb={4}
          gap={6}
          style={{
            backgroundColor: theme.colors.white,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray200,
          }}
        >
          <Container flexDirection="row" gap={4}>
            <Image
              source={{
                uri: course?.thumbnail
                  ? `${FilePathUtils.courseImagePath(course?.id)}/${
                      course?.thumbnail
                    }`
                  : fallbackImages.course,
              }}
              style={{
                width: "40%",
                height: 90,
                borderRadius: 8,
              }}
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

          <SectionDivider />

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
        </Container>
      </ScrollView>

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
            ৳ {course?.isFree ? "ফ্রি" : numberToDigitFormat(finalPrice ?? 0)}
          </Typography>
        </View>

        <Link
          style={{
            backgroundColor: theme.colors.primary600,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
            textAlign: "center",
          }}
          href={
            course?.isFree
              ? `/take-payment/${course?.id}`
              : `/enrolled/${course?.id}`
          }
        >
          <Typography weight="bold" color="white">
            {course?.isFree ? "এখনই এনরোল করুন " : "পেমেন্ট সম্পন্ন করুন"}
          </Typography>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  paymentTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: theme.colors.primary600,
    borderRadius: 99,
  },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
