import useAxios from "@/hooks/useAxios";
import {
  ApiSuccessResponse,
  LessonViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonDetails = (id: number | undefined) => {
  const axios = useAxios();

  return useQuery<LessonViewModel, Error>({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<LessonViewModel>>(
        `/lessons/${id}`
      );
      return data?.data;
    },
  });
};
