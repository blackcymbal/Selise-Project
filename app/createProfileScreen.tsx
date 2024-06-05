import { Typography } from "@/components/ui";
import { LoginScreenContainer, ProfileInfo } from "@/components/user";
import React from "react";
import { StyleSheet } from "react-native";

const createProfileScreen = () => {
  return (
    <LoginScreenContainer>
      <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
        প্রোফাইল তথ্যাবলি
      </Typography>
      <ProfileInfo />
    </LoginScreenContainer>
  );
};

export default createProfileScreen;

const styles = StyleSheet.create({});
