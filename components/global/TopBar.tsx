import { Notification, Search } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "../ui";
import { SafeAreaView } from "react-native-safe-area-context";

const TopBar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.section}>
          <View>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyihErtCtRI3az31JHY16wxBlNEQ19R2C0ixWJXPPATULcc=s64-c-mo",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.welcomeView}>
            <Typography weight="medium" size="lg" color="gray900">
              স্মানসুর জোহা
            </Typography>
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.buttton}>
            <Search color={theme.colors.gray900} height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttton}>
            <Notification color={theme.colors.gray900} height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeView: { marginLeft: 5 },
  buttton: { marginHorizontal: 5 },
  image: { height: 40, width: 40, borderRadius: 40, marginHorizontal: 5 },
});
