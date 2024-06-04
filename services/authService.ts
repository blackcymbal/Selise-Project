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
import { useMutation } from "@tanstack/react-query";
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

export type UserUpdateRequest = {
  name: string;
  age: number;
  gender: string;
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
      if (error?.statusCode && error.statusCode === 401) {
        Alert.alert("Error", `Your email or password didn't match`, [
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
    mutationFn: (
      data: Pick<SignUpRequest, "phone" | "countryCode" | "dialCode">
    ) => {
      return axiosClient
        .post(`/auth/check-user-existence`, data)
        .then((response) => response?.data)
        .catch((err) => console.log(err));
    },
    onSuccess: (response) => {},
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
    mutationFn: (data: SignUpRequest) => {
      return axiosClient
        .post(`/auth/signup`, data)
        .then((response) => response?.data)
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
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
    mutationFn: (data: UserUpdateRequest) => {
      return axiosClient
        .put(`/auth/me`, data)
        .then((response) => response?.data)
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccess: (response) => {
      setAuth(response.data, token as string);
      router.navigate("/screens");
    },
  });
};
