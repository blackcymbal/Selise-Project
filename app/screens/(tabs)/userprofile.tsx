import useAuth from "@/hooks/auth/useAuth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { token, user } = useAuth();

  console.log(">>>>>>>>>>>>", token, user);
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
