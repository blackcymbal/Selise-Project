import { Typography } from "@/components/ui";
import { LoginInputs, LoginScreenContainer } from "@/components/user";
import theme from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const SignIn = () => {
  return (
    <LoginScreenContainer>
      <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
        লগ ইন করুন
      </Typography>
      <Typography
        weight="regular"
        size="base"
        color="gray900"
        style={styles.subTitle}
      >
        মোবাইল নম্বর দিয়ে তাজদীদ একাডেমির সাথে শেখা শুরু করুন
      </Typography>
      <LoginInputs />
      <Link href="/screens" asChild>
        <TouchableOpacity style={styles.guestModeButton}>
          <Typography
            weight="regular"
            size="base"
            color="gray900"
            style={styles.guestTitle}
          >
            গেস্ট মোডে প্রবেশ করুন
          </Typography>
        </TouchableOpacity>
      </Link>
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
