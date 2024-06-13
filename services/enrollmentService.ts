import useAuth from "@/hooks/auth/useAuth";
import useAxios, { ApiSuccessResponse } from "@/hooks/useAxios";
import { EnrollmentViewModel } from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

export const useGetEnrolledCourses = () => {
  const axios = useAxios();
  const { user } = useAuth();

  return useQuery<EnrollmentViewModel[], Error>({
    queryKey: ["enrolledCourse", user?.id],
    queryFn: async () => {
      const { data } = await axios.get<
        ApiSuccessResponse<EnrollmentViewModel[]>
      >(`/enrollments/me`);
      return data.data;
    },
    enabled: true,
  });
};
