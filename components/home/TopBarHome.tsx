import { Notification, Search } from "@/assets/icons/icons";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import bgImage from "@/assets/images/topbar-bg.png";
import theme from "@/constants/theme";
import Typography from "../ui/Typography";

const TopBarHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.inner}>
        <View style={styles.section}>
          <View>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyihErtCtRI3az31JHY16wxBlNEQ19R2C0ixWJXPPATULcc=s64-c-mo",
              }}
              style={styles.image}
            />
          </View>
          <View>
            <Typography weight="medium" size="lg" color="white">
              স্বাগতম, মানসুর জোহা
            </Typography>
            <Typography weight="regular" size="xs" color="white">
              তাজদিদ একাডেমির সাথে শিখুন
            </Typography>
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity>
            <Search color={"#fff"} height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Notification color={"#fff"} height={24} width={24} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TopBarHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary900,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  image: { height: 40, width: 40, borderRadius: 40, marginHorizontal: 5 },
});
