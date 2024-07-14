import logo from "@/assets/logo-black.webp";
import Container from "@/components/ui/Container";
import React, { ReactNode } from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";

const LoginScreenContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollView>
      <Container style={styles.container}>
        <Image source={logo} style={styles.logo} />
        {children}
      </Container>
    </ScrollView>
  );
};

export default LoginScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  logo: {
    resizeMode: "cover",
    marginTop: Dimensions.get("screen").height * 0.15,
  },
});
