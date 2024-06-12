import useAxios, { ApiSuccessResponse } from "@/hooks/useAxios";
import {
  CourseViewModel,
  LessonViewModel,
  ResourceViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

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

export const useGetCourseBySlug = (
  courseSlug?: string | string[] | undefined
) => {
  const axios = useAxios();
  return useQuery<CourseViewModel, Error>({
    queryKey: ["courseDetails", courseSlug],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<CourseViewModel>>(
        `/courses/by-slug/${courseSlug as string}`
      );
      return data.data;
    },
    enabled: !!courseSlug,
  });
};

export const useGetLessonDetails = (id?: string | string[] | undefined) => {
  const axios = useAxios();

  return useQuery<LessonViewModel, Error>({
    queryKey: ["lessonDetails", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<LessonViewModel>>(
        `/lessons/${id}`
      );
      return data?.data;
    },
    enabled: !!id,
  });
};

export const useGetResourceDetails = (id?: string | undefined) => {
  const axios = useAxios();

  return useQuery<ResourceViewModel, Error>({
    queryKey: ["resourceDetails", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<ResourceViewModel>>(
        `/resources/${id}`
      );
      return data?.data;
    },
    enabled: !!id,
  });
};
