import {
  ClockIcon,
  DocumentFIleIcon,
  FacebookIcon,
  PhoneCallIcon,
  PlayCircleIcon,
  QuizIcon,
  UsersIcon,
} from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../ui";

export default function CourseCardPreview({
  course,
}: {
  course: CourseViewModel;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Typography weight="bold" size="2xl" color="title">
          কোর্সটিতে যা যা পাবেন
        </Typography>

        <View>
          {/* Row 1 */}
          <View style={styles.rowContainer}>
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.cyan50 },
                ]}
              >
                <UsersIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  কোর্সটি করছেন
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  ৪৬৫ জন
                </Typography>
              </View>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.moss50 },
                ]}
              >
                <ClockIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  সময় লাগবে
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  {course?.duration}
                </Typography>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine} />

          {/* Row 2 */}
          <View style={styles.rowContainer}>
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.primary50 },
                ]}
              >
                <PlayCircleIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  ভিডিও লেসন
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  ৩৪
                </Typography>
              </View>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.warning50 },
                ]}
              >
                <DocumentFIleIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  লেসন ডকুমেন্ট
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  ১০ টি
                </Typography>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine} />

          {/* Row 3 */}
          <View style={styles.rowContainer}>
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.purple50 },
                ]}
              >
                <QuizIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  কুইজ সংখ্যা
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  ৭ টি
                </Typography>
              </View>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.iconLabelContainer}>
              <View
                style={[
                  styles.iconBgStyle,
                  { backgroundColor: theme.colors.blue50 },
                ]}
              >
                <FacebookIcon width={20} height={20} />
              </View>
              <View>
                <Typography weight="regular" size="sm" color="body">
                  সাপোর্ট গ্রুপ
                </Typography>
                <Typography weight="bold" size="lg" color="title">
                  ফেসবুক
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.communication}>
        <PhoneCallIcon width={16} height={16} />
        <Typography weight="medium" size="sm" style={styles.communicationText}>
          যে কোন প্রয়োজনে কল করুন{" "}
          <Typography color="primaryDefault"> ০১৭৫৪৫৫৮৩১৩ </Typography> নম্বরে
          (সকাল ১০টা থেকে রাত ১০ টা)
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    width: "100%",
  },
  previewContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    flexDirection: "column",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  iconLabelContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    width: "45%",
  },
  iconBgStyle: { width: 36, height: 36, padding: 8, borderRadius: 36 },
  iconStyle: {
    width: 36,
    height: 36,
  },
  verticalLine: {
    width: 1,
    height: "100%",
    backgroundColor: theme.colors.gray200,
    borderRadius: 32,
    marginHorizontal: 12,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: theme.colors.gray200,
    borderRadius: 100,
    marginVertical: 12,
  },
  communication: {
    flexDirection: "row",
    gap: 9,
    marginRight: 16,
  },
  communicationText: {
    textAlign: "left",
  },
  phoneCallIcon: {
    paddingVertical: 4,
  },
});
