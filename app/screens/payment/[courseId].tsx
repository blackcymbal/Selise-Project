import TopBar from "@/components/global/TopBar";
import {
  CourseSmallPreview,
  MediumOfPayment,
  PaymentDetails,
  PaymentFooter,
  TermsAndCondition,
} from "@/components/payment";
import { Container, SectionDivider } from "@/components/ui";
import theme from "@/constants/theme";
import { useGetCourse } from "@/services/courseService";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CoursePayment() {
  const params = useLocalSearchParams();

  const {
    data: course,
    isLoading,
    error,
  } = useGetCourse(params?.courseId ? +params?.courseId : undefined);

  const [isChecked, setIsChecked] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");

  const finalPrice = course?.discount
    ? course?.price * (1 - course?.discount / 100)
    : course?.price;

  const isFreeCourse = course?.isFree || finalPrice === 0;

  return (
    <>
      <TopBar />
      <ScrollView style={styles.container}>
        <Container
          py={5}
          gap={course?.isFree ? 1 : 6}
          style={{ backgroundColor: theme.colors.gray50 }}
        >
          <MediumOfPayment
            isFreeCourse={isFreeCourse}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <TermsAndCondition
            isFreeCourse={isFreeCourse}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </Container>
        <Container pt={6} pb={4} gap={6} style={styles.previewContainer}>
          <CourseSmallPreview course={course as CourseViewModel} />
          <SectionDivider />
          <PaymentDetails course={course as CourseViewModel} />
        </Container>
      </ScrollView>
      <PaymentFooter
        isFreeCourse={isFreeCourse}
        course={course as CourseViewModel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.white },
  previewContainer: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
});
