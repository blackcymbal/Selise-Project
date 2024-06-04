import { Button, Typography } from "@/components/ui";
import {
  LoginScreenContainer,
  OtpInputs,
  RestOfOtpScreen,
} from "@/components/user";
import { useLogin, useSignUp } from "@/services/authService";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const OtpScreen = () => {
  const [buttonActive, setButtonActive] = useState(false);
  const [otp, setOtp] = useState<number | undefined>(undefined);

  const signUpMutation = useSignUp();
  const loginMutation = useLogin();

  const params = useLocalSearchParams();

  const getCodeFromInput = (codes: string[]) => {
    const fullCode = codes?.join("");
    console.log(fullCode);
    setOtp(Number(fullCode));
    setButtonActive(fullCode?.length === 4 ? true : false);
  };

  console.log(params);

  const handlePress = () => {
    const phone = typeof params?.phone === "string" ? params.phone : "";
    const countryCode =
      typeof params?.countryCode === "string" ? params.countryCode : "";
    const dialCode =
      typeof params?.dialCode === "string" ? params.dialCode : "";

    const signUpData = {
      phone: phone,
      countryCode: countryCode,
      dialCode: dialCode,
      code: otp as number,
    };

    const loginData = {
      id: Number(params?.id),
      code: otp as number,
    };

    console.log("loginData", loginData);

    if (params?.isNewUser === "true") {
      signUpMutation.mutate(signUpData, {
        onSuccess: () => {
          router.navigate("/createProfileScreen");
        },
      });
    } else {
      loginMutation.mutate(loginData, {
        onSuccess: () => {
          router.replace("/screens");
        },
      });
    }
  };
  return (
    <LoginScreenContainer>
      <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
        OTP ভেরিফিকেশন
      </Typography>
      <Typography
        weight="regular"
        size="base"
        color="gray900"
        style={styles.subTitle}
      >
        আপনার 01878044600 মোবাইল নম্বরে পাঠানো ৪ ডিজিটের কোডটি লিখুন
      </Typography>
      <OtpInputs getCodeFromInput={getCodeFromInput} />
      <Button active={buttonActive} buttonStyle="inline" onPress={handlePress}>
        এগিয়ে যান
      </Button>
      <RestOfOtpScreen />
    </LoginScreenContainer>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: "center",
  },
});
