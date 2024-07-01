import useAxios from "@/hooks/useAxios";
import {
  ActivityViewModel,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@tajdid-academy/tajdid-corelib";
import { useMutation } from "@tanstack/react-query";

type CreateActivityForLessonRequest = {
  courseId: number | undefined;
  moduleId: number | undefined;
  lessonId: number | undefined;
  type: "LESSON";
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

// /activities/${activityId}/complete

// export const completeActivity = (activityId?: number, timeTaken?: number) => {
//   const axiosClient = useAxios();

//   return useMutation<ApiSuccessResponse<ActivityViewModel>, ApiErrorResponse>({
//     mutationFn: async (data) => {
//       return axiosClient
//         .put(`/activities/${activityId}/complete`, data)
//         .then((response) => response?.data);
//     },
//     onSuccess: (response) => {
//       return response.data;
//     },
//     onError: (error: ApiErrorResponse) => {
//       console.log("lesson error activity:", error);
//     },
//   });
// };

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
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {},
  });
};
