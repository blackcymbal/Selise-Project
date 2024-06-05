import { apiEndpoint } from "@/config";
import { ErrorCodes, ValueOf } from "@tajdid-academy/tajdid-corelib";
import axios, {
  Axios,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useMemo } from "react";
import { Alert } from "react-native";
import useAuth from "./auth/useAuth";

export type ApiResponse<T = Record<string, unknown>> = {
  statusCode: number;
  path: string;
  timestamp: string;
} & (
  | {
      status: "error";
      data: {
        error: ValueOf<typeof ErrorCodes>;
        statusCode: number;
        message: string;
      };
    }
  | {
      status: "success";
      data: T;
    }
);

export type ApiSuccessResponse<TData> = Extract<
  ApiResponse<TData>,
  { status: "success" }
>;
export type ApiErrorResponse = Extract<ApiResponse, { status: "error" }>;

export default function useAxios() {
  const { token, removeAuth } = useAuth();

  const axiosClient: Axios = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiEndpoint,
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (token && config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<AxiosError> => {
        if (error.response) {
          const statusCode = error.response ? error.response.status : null;

          if (statusCode === 401) {
            removeAuth();
          }

          if (statusCode && statusCode >= 500) {
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

            return Promise.reject(error);
          }

          return Promise.reject(error.response.data);
        }

        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }, []);

  return axiosClient;
}
