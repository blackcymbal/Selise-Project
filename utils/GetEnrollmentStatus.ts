import { useGetEnrolledCourses } from "@/services/enrollmentService";

export const getEnrollmentStatus = (id: number | undefined) => {
  const { data } = useGetEnrolledCourses();

  if (!data) {
    return false;
  }
  const isEnrolled = !!data.find((item) => item.course.id === id);
  return isEnrolled;
};
