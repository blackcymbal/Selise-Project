import useAuth from "@/hooks/auth/useAuth";
import useAxios, {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/hooks/useAxios";
import {
  UserAuth,
  UserExistenceResponse,
  UserViewModel,
} from "@tajdid-academy/tajdid-corelib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export type LoginRequest = {
  id: number;
  code: number;
};

export type SignUpRequest = {
  phone: string;
  countryCode: string;
  dialCode: string;
  code: number;
};

export type UserUpdateRequest = Pick<UserViewModel, "name" | "age" | "gender">;

export type UseUploadProfilePictureRequest = {
  fileName: string;
  fileType: string;
};

const handleOtpError = (error: ApiErrorResponse) => {
  if (error?.statusCode && error.statusCode === 400) {
    Alert.alert("Error", error?.data?.message, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else {
    Alert.alert(
      "Server Error",
      "Oops! Something went wrong. Please try again later.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
  }
};
export const useLogin = () => {
  const { setAuth } = useAuth();
  const axiosClient = useAxios();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      axiosClient.post(`/auth/login`, data).then((response) => response?.data),
    onSuccess: (response: ApiSuccessResponse<UserAuth>) => {
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);

      router.navigate("/screens");
    },
    onError: (error: ApiErrorResponse) => {
      handleOtpError(error);
    },
  });
};

export const useCheckUserExistence = () => {
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<UserExistenceResponse>,
    ApiErrorResponse,
    Pick<SignUpRequest, "phone" | "countryCode" | "dialCode">
  >({
    mutationFn: (data) => {
      return axiosClient
        .post(`/auth/check-user-existence`, data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {},
    onError: (error: ApiErrorResponse) => {
      console.log(error);
    },
  });
};

export const useSignUp = () => {
  const { setAuth } = useAuth();
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<UserAuth>,
    ApiErrorResponse,
    SignUpRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .post(`/auth/signup`, data)
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
    },
    onError: (error: ApiErrorResponse) => {
      handleOtpError(error);
    },
  });
};

export const useUpdateProfile = () => {
  const { setAuth, token } = useAuth();
  const axiosClient = useAxios();

  return useMutation<
    ApiSuccessResponse<UserViewModel>,
    ApiErrorResponse,
    UserUpdateRequest
  >({
    mutationFn: async (data) => {
      return axiosClient
        .put(`/auth/me`, data)
        .then((response) => response?.data)
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccess: (response) => {
      setAuth(response.data, token as string);
      router.replace("/screens");
    },
  });
};

export const useGetMyProfile = (enabled: boolean) => {
  const { setAuth, token } = useAuth();
  const axiosClient = useAxios();

  return useQuery<UserViewModel, Error>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const { data } = await axiosClient.get<ApiSuccessResponse<UserViewModel>>(
        `/auth/me`
      );
      setAuth(data?.data, token as string);
      return data?.data;
    },
    enabled,
  });
};

export const useUploadUserProfile = () => {
  const axiosClient = useAxios();
  return useMutation<ApiSuccessResponse<string>, ApiErrorResponse, FormData>({
    mutationFn: (data: FormData) => {
      return axiosClient
        .post(`/users/uploads/profile`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => console.log(error));
    },
  });
};
