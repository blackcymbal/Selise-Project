import useAuth from "@/hooks/auth/useAuth";
import useAxios, {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/hooks/useAxios";
import { UserAuth } from "@tajdid-academy/tajdid-corelib";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  phone: string;
  countryCode: string;
  dialCode: string;
  code: number;
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
        .then((response) => response?.data);
    },
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      console.log(user, accessToken);
      setAuth(user, accessToken);
      router.navigate("/screens");
    },
  });
};
