import { Button, Typography } from "@/components/ui";
import {
  LoginScreenContainer,
  OtpInputs,
  RestOfOtpScreen,
} from "@/components/user";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const OtpScreen = () => {
  const [buttonActive, setButtonActive] = useState(false);

  const getCodeFromInput = (codes: string[]) => {
    const fullCode = codes?.join("");
    setButtonActive(fullCode?.length === 4 ? true : false);
  };

  const handlePress = () => {
    //
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
