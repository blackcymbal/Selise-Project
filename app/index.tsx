import useAuth from "@/hooks/auth/useAuth";
import { Link, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  const { token } = useAuth();

  setTimeout(() => {
    if (token) {
      router.replace("/screens");
    } else {
      router.replace("/signIn");
    }
  }, 2000);

  const handleGoSignIn = () => {
    router.replace("/signIn");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is a Welcome screen for new users</Text>
      <Text>Still under constructed</Text>
      <Link href="/screens" asChild style={{ marginVertical: 20 }}>
        <TouchableOpacity>
          <Text>Go to Home Screen</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity onPress={handleGoSignIn}>
        <Text>Go to Sign In Screen</Text>
      </TouchableOpacity>

      {/* <Link href="/createProfileScreen" asChild style={{ marginVertical: 20 }}>
        <TouchableOpacity>
          <Text>Go to Profile Creation Screen</Text>
        </TouchableOpacity>
      </Link> */}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
