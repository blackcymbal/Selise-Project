import useAxios from "@/hooks/useAxios";
import {
  ApiSuccessResponse,
  QuizViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

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

export const useGetQuizzesQuestions = (id: number | undefined) => {
  const axios = useAxios();

  return useQuery<QuizViewModel, Error>({
    queryKey: ["quizzes-questions", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<QuizViewModel>>(
        `/quiz-question/${id}`
      );
      return data?.data;
    },
  });
};
