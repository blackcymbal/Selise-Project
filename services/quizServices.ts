import useAxios from "@/hooks/useAxios";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useMutation, useQuery } from "@tanstack/react-query";

export type QuizAnswerViewModel = {
  id: number;
  quizId: number;
  questionId: number;
  optionId: number;
};

type CreateBulkQuizAnswersRequest = {
  quizId: number;
  answers: { questionId: number; optionId: number }[];
};

type UpdateQuizAnswerRequest = {
  answers: { id?: number; optionId: number }[];
};

export const useGetQuizzesDetails = (id: number | undefined) => {
  const axios = useAxios();

  return useQuery<QuizViewModel, Error>({
    queryKey: ["quizzes", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<QuizViewModel>>(
        `/quizzes/${id}`
      );
      return data?.data;
    },
  });
};

export const useGetMyQuizAnswers = (id: number | undefined) => {
  const axios = useAxios();

  return useQuery<QuizAnswerViewModel[], Error>({
    queryKey: ["myAnswers", id],
    queryFn: async () => {
      const { data } = await axios.get<
        ApiSuccessResponse<QuizAnswerViewModel[]>
      >(`/quiz-answers/me/quiz/${id}`);
      return data?.data;
    },
  });
};

export const useCreateBulkQuizAnswers = () => {
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<QuizAnswerViewModel>,
    ApiErrorResponse,
    CreateBulkQuizAnswersRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .post("/quiz-answers/bulk", data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {},
  });
};


export const useUpdateBulkQuizAnswers = () => {
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<QuizAnswerViewModel>,
    ApiErrorResponse,
    UpdateQuizAnswerRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .put("/quiz-answers/bulk", data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: ApiErrorResponse) => {},
  });
};
