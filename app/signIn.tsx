import { Button, Typography } from "@/components/ui";
import { LoginInputs, LoginScreenContainer } from "@/components/user";
import theme from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const SignIn = () => {
  return (
    <LoginScreenContainer>
      <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
        লগ ইন করুন
      </Typography>
      <Button
        active={true}
        onPress={() => router.navigate("createProfileScreen")}
      >
        Go to profile
      </Button>
      <Typography
        weight="regular"
        size="base"
        color="gray900"
        style={styles.subTitle}
      >
        মোবাইল নম্বর দিয়ে তাজদীদ একাডেমির সাথে শেখা শুরু করুন
      </Typography>
      <LoginInputs />
    </LoginScreenContainer>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: "center",
  },
  guestModeButton: {
    paddingVertical: 4,
    width: "100%",
    alignItems: "flex-end",
  },
  guestTitle: {
    textDecorationLine: "underline",
    textDecorationColor: theme.colors.primaryDefault,
    textDecorationStyle: "double",
  },
});
