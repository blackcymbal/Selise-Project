import useAuth from "@/hooks/auth/useAuth";
import useAxios, { ApiSuccessResponse } from "@/hooks/useAxios";
import {
  CourseViewModel,
  LessonViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";

export type GetCoursesFilter = {
  search?: string;
  limit?: number;
  offset?: number;
  categoryId?: number;
  status?: CourseViewModel["status"];
};

export const useGetCourses = (enabled?: boolean, filter?: GetCoursesFilter) => {
  const axios = useAxios();
  return useQuery<CourseViewModel[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<CourseViewModel[]>>(
        `/courses`,
        { params: { status: "PUBLISHED", ...filter } }
      );
      return data.data;
    },
    enabled,
  });
};

export const useGetCourse = (id?: string | string[] | undefined) => {
  const axios = useAxios();
  return useQuery<CourseViewModel, Error>({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<CourseViewModel>>(
        `/courses/${id as string}`
      );
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetLessonDetails = (id?: string | string[] | undefined) => {
  const axios = useAxios();
  const { token } = useAuth();
  const router = useRouter();

  const targetedRoute = usePathname();

  if (!token) {
    router.navigate({
      pathname: "signIn",
      params: { targetedRoute },
    });
  }

  return useQuery<LessonViewModel, Error>({
    queryKey: ["lessonDetails", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<LessonViewModel>>(
        `/lessons/${id}`
      );
      return data?.data;
    },
    enabled: !!id && !!token,
  });
};
