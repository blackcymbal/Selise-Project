import useAxios from "@/hooks/useAxios";
import {
  ApiSuccessResponse,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

export type QuizAnswerViewModel = {
  id: number;
  quizId: number;
  questionId: number;
  optionId: number;
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
      const { data } = await axios.get<ApiSuccessResponse<QuizAnswerViewModel[]>>(
        `/quiz-answers/me/quiz/${id}`
      );
      return data?.data;
    },
  });
};