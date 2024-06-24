import useAxios from "@/hooks/useAxios";
import {
  ApiSuccessResponse,
  ResourceViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useQuery } from "@tanstack/react-query";

export const useGetResourceDetails = (id: number | undefined) => {
  const axios = useAxios();

  return useQuery<ResourceViewModel, Error>({
    queryKey: ["resource", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiSuccessResponse<ResourceViewModel>>(
        `/resources/${id}`
      );
      return data?.data;
    },
  });
};
