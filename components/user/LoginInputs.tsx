import theme from "@/constants/theme";
import { useCheckUserExistence } from "@/services/authService";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Button, Typography } from "../ui";
import ErrorMessage from "../ui/ErrorMessage";

const LoginInputs = () => {
  const [phoneNumer, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("BD");
  const [dialCode, setDialCode] = useState("+88");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const phoneInput = useRef<PhoneInput>(null);

  const checkUserExistenceMutation = useCheckUserExistence();

  const handlePress = () => {
    const finalData = {
      phone: "0" + phoneNumer,
      countryCode: countryCode,
      dialCode: dialCode,
    };

    checkUserExistenceMutation.mutate(finalData, {
      onSuccess: (data) => {
        setErrorMessage(undefined);
        router.replace({
          pathname: "/otpScreen",
          params: {
            isNewUser: data?.data?.isNewUser,
            ...data?.data?.user,
            ...finalData,
          },
        });
      },
      onError: (error) => {
        setErrorMessage(error?.data?.message);
      },
    });
  };

  return (
    <View style={styles.container}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Typography mt={4} color="gray900">
        মোবাইল নম্বর *
      </Typography>
      <PhoneInput
        ref={phoneInput}
        placeholder={" "}
        defaultCode={"BD"}
        layout="first"
        onChangeCountry={(code) => {
          setDialCode("+" + code?.callingCode[0]?.slice(0, -1));
          setCountryCode(code?.cca2);
        }}
        onChangeText={(number) => setPhoneNumber(number)}
        withDarkTheme
        textInputStyle={
          Platform.OS === "android" ? styles.input : { height: 48 }
        }
        containerStyle={[styles.input, styles.containerStyle]}
        textContainerStyle={styles.textContainerStyle}
        codeTextStyle={styles.codeTextStyle}
      />
      <Button
        active={phoneNumer?.length > 9 ? true : false}
        buttonStyle="inline"
        onPress={handlePress}
      >
        লগ ইন করুন
      </Button>
    </View>
  );
};

export default LoginInputs;

const styles = StyleSheet.create({
  container: { width: "100%", marginTop: 20 },
  input: {
    marginTop: 8,
    marginBottom: 16,
    width: "100%",
    height: 48,
  },
  containerStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primaryDefault,
    width: "100%",
    height: 48,
    padding: 0,
    marginTop: 8,
  },
  textContainerStyle: {
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  codeTextStyle: {
    fontSize: 16,
    fontWeight: "normal",
    height: 48,
    marginTop: Platform.OS === "android" ? 26 : 30,
  },
});
