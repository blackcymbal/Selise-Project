import Loader from "@/components/global/Loader";
import useGetLocalData from "@/hooks/useGetLocalData";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Welcome = () => {
  const { data: phoneNumber, loading: phoneNumerLoading } =
    useGetLocalData("phoneNumber");
  const { data: token, loading } = useGetLocalData("authKey");

  useEffect(() => {
    if (!loading || !phoneNumerLoading) {
      if (token == "null") {
        router.replace({
          pathname: "/signIn",
          params: { phoneNumber: String(phoneNumber) },
        });
      } else {
        router.replace("/screens");
      }
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
