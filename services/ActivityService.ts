import useAxios from "@/hooks/useAxios";
import {
  ActivityViewModel,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@tajdid-academy/tajdid-corelib";
import { useMutation, useQuery } from "@tanstack/react-query";

type CreateActivityForLessonRequest = {
  courseId: number | undefined;
  moduleId: number | undefined;
  lessonId: number | undefined;
  type: "LESSON";
};

type CompleteActivityRequest = {
  activityId: number | undefined;
  timeTaken?: number;
};

export const createActivityForLesson = () => {
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<ActivityViewModel>,
    ApiErrorResponse,
    CreateActivityForLessonRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .post("/activities", data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {},
  });
};

type CreateActivityForQuizRequest = {
  courseId: number | undefined;
  moduleId: number | undefined;
  quizId: number | undefined;
  type: "QUIZ";
};

export const createActivityForQuiz = () => {
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<ActivityViewModel>,
    ApiErrorResponse,
    CreateActivityForQuizRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .post("/activities", data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      console.log(response.data);
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {},
  });
};

export const useGetActivityForACourse = (courseId: number | undefined) => {
  const axios = useAxios();
  return useQuery<ActivityViewModel, Error>({
    queryKey: ["courseActivity"],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<ActivityViewModel>>(
        `/activities/me/course/${courseId}`
      );
      return data?.data;
    },
  });
};

export const useCompleteActivity = () => {
  const axiosClient = useAxios();
  return useMutation<
    ApiSuccessResponse<ActivityViewModel>,
    ApiErrorResponse,
    CompleteActivityRequest
  >({
    mutationFn: async (data) => {
      // Below I have to clearify from Sohaib or Mohib bhai how it works
      const requestBody = {
        timeTaken: data?.timeTaken,
      };
      return axiosClient
        .put(
          `/activities/${data?.activityId}/complete`,
          JSON.stringify(requestBody)
        )
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {
      console.log("lesson error activity:", error);
    },
  });
};
