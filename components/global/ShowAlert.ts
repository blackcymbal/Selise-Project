import { Alert } from "react-native";

type ShowAlertProps = {
  message: string;
  type: "Error" | "Success";
};

export default function ShowAlert({ message, type }: ShowAlertProps) {
  Alert.alert(type, message, [
    {
      text: "OK",
    },
  ]);
}
