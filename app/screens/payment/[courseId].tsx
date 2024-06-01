import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, SectionDivider, Typography } from "@/components/ui";
import { useGetCourse } from "@/services/courseService";
import theme from "@/constants/theme";
import TopBar from "@/components/global/TopBar";
import { DocumentFIleIcon, LockIcon } from "@/assets/icons/icons";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { groupBy } from "@tajdid-academy/tajdid-corelib";
import { FilePathUtils, fallbackImages } from "@/utils";
import Radio from "@/components/radio/Radio";
import RadioItem from "@/components/radio/RadioItem";

export default function CoursePayment() {
  const params = useLocalSearchParams();
  const { data: course, isLoading, error } = useGetCourse(params?.courseId);
  const [isChecked, setIsChecked] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");

  const contents = course?.curriculum?.flatMap((item) => item.contents) ?? [];
  const contentGroupByType = groupBy(contents, "type");

  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  const discountPrice = course?.discount
    ? course?.price * (course?.discount / 100)
    : course?.price;
  const finalPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  const isFreeCourse = course?.isFree || finalPrice === 0;

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
            {!isFreeCourse && (
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

          {!isFreeCourse && (
            <Radio style={{ gap: 16 }}>
              <Radio.Item
                selected={paymentMethod}
                setSelected={setPaymentMethod}
                value="NAGAD"
                style={styles.radioContainer}
                radioActiveColor={theme.colors.primary600}
                radioActiveFillColor={theme.colors.primary50}
              >
                <RadioItem.Label>
                  <View style={styles.labelContainer}>
                    <View>
                      <Typography>নগদ</Typography>
                    </View>
                    <View>
                      <Image
                        width={48}
                        height={20}
                        resizeMode="contain"
                        source={{
                          uri: "https://iconape.com/wp-content/png_logo_vector/nagad-logo.png",
                        }}
                      />
                    </View>
                  </View>
                </RadioItem.Label>
              </Radio.Item>
              <Radio.Item
                selected={paymentMethod}
                setSelected={setPaymentMethod}
                value="SSL_COMMERZ"
                style={styles.radioContainer}
                radioActiveColor={theme.colors.primary600}
                radioActiveFillColor={theme.colors.primary50}
              >
                <RadioItem.Label>
                  <View style={styles.labelContainer}>
                    <View>
                      <Typography>অন্যান্য পেমেন্ট মাধ্যম</Typography>
                    </View>
                    <View
                      style={{
                        gap: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        width={29}
                        height={24}
                        resizeMode="contain"
                        source={{
                          uri: "https://pngimg.com/d/visa_PNG30.png",
                        }}
                      />
                      <Image
                        width={20}
                        height={16}
                        resizeMode="contain"
                        source={{
                          uri: "https://w7.pngwing.com/pngs/397/885/png-transparent-logo-mastercard-product-font-mastercard-text-orange-logo.png",
                        }}
                      />
                      <Image
                        width={24}
                        height={16}
                        resizeMode="contain"
                        source={{
                          uri: "https://i.pinimg.com/474x/30/a4/e4/30a4e42613a30af996ba45510a5150e3.jpg",
                        }}
                      />
                    </View>
                  </View>
                </RadioItem.Label>
              </Radio.Item>
            </Radio>
          )}

          {!isFreeCourse && (
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

          {isFreeCourse && (
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
            ৳ {isFreeCourse ? "ফ্রি" : numberToDigitFormat(finalPrice ?? 0)}
          </Typography>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary600,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
          }}
          disabled={
            finalPrice === 0 ? !isChecked : !isChecked || !paymentMethod
          }
        >
          <Typography
            weight="bold"
            color="white"
            style={{ textAlign: "center" }}
          >
            {isFreeCourse ? "এখনই এনরোল করুন " : "পেমেন্ট সম্পন্ন করুন"}
          </Typography>
        </TouchableOpacity>
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray300,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    width: "92%",
  },
});
