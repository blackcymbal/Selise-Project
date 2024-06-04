import Loader from "@/components/global/Loader";
import useToken from "@/hooks/useToken";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Welcome = () => {
  // const { token } = useAuth();
  const { token, loading } = useToken("authKey");

  useEffect(() => {
    if (!loading) {
      if (token == "null") {
        router.replace("/signIn");
      } else {
        router.replace("/screens");
      }
    }
  }, [loading]);

  const handleGoSignIn = () => {
    router.replace("/signIn");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loader />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
