import useAxios, { ApiSuccessResponse } from "@/hooks/useAxios";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCourses = () => {
  const axios = useAxios();
  return useQuery<CourseViewModel[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<CourseViewModel[]>>(
        `/courses?status=PUBLISHED&includeLessonCount=true`
      );
      return data.data;
    },
    enabled: true,
  });
};

export const useGetCourse = (id: number | undefined) => {
  const axios = useAxios();
  return useQuery<CourseViewModel, Error>({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<CourseViewModel>>(
        `/courses/${id}`
      );
      return data.data;
    },
  });
};

export const useCreateTransactions = () => {
  const axiosClient = useAxios();

  return useMutation({
    mutationFn: (requestBody) =>
      axiosClient
        .post(`/transactions`, requestBody)
        .then((response) => response?.data),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
