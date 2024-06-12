import { Typography } from "@/components/ui";
import { LoginScreenContainer, ProfileInfo } from "@/components/user";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const createProfileScreen = () => {
  const params = useLocalSearchParams();

  return (
    <LoginScreenContainer>
      <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
        প্রোফাইল তথ্যাবলি
      </Typography>
      <ProfileInfo path={params?.path as string} />
    </LoginScreenContainer>
  );
};

export default createProfileScreen;

const styles = StyleSheet.create({});
