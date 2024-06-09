import Loader from "@/components/global/Loader";
import useGetLocalData from "@/hooks/useGetLocalData";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Welcome = () => {
  const { data: token, loading } = useGetLocalData("authKey");

  useEffect(() => {
    if (!loading) {
      if (token == "null") {
        router.replace("/signIn");
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
