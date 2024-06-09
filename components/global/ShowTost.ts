import { ToastAndroid } from "react-native";

type ShowToastProps = {
  message: string;
};
export default function ShowToast({ message }: ShowToastProps) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
