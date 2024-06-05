import { Edit } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Container, Typography } from "../ui";

export default function OtpFooter() {
  const handleGoSignIn = () => {
    router.replace("/signIn");
  };
  return (
    <Container px={0} mt={8} style={styles.container}>
      <Typography>কোন কোড পাননি?</Typography>
      <TouchableOpacity>
        <Typography weight="semiBold" color="primary700">
          রিসেন্ড OTP
        </Typography>
      </TouchableOpacity>
      <Container
        px={0}
        py={4}
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 8,
          marginTop: 32,
        }}
      >
        <Typography style={styles.text1}>
          মোবাইল নম্বরটি ভুল হয়নি তো? 01754558313
        </Typography>

        <TouchableOpacity style={styles.button} onPress={handleGoSignIn}>
          <Edit color={theme.colors.primary700} height={24} width={24} />
          <Typography weight="semiBold" color="primary700">
            নম্বর পরিবর্তন
          </Typography>
        </TouchableOpacity>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  text1: { textAlign: "center" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
});
