import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserProfile = () => {
  const { token, user, removeAuth } = useAuth();
  const { data, isLoading } = useGetMyProfile();

  console.log(">>>>>>>>>>>>", token, user);
  const handlePress = () => {
    removeAuth();
    router.replace("/signIn");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
