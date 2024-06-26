import { Notification, Search, User } from "@/assets/icons/icons";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import bgImage from "@/assets/images/topbar-bg.png";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { FilePathUtils, fallbackImages } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../ui";

const TopBarHome = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.inner}>
        <View style={styles.section}>
          <View>
            {user?.picture ? (
              <Image
                source={{
                  uri: user?.picture
                    ? `${FilePathUtils.userProfilePath(user.id)}/${
                        user.picture
                      }`
                    : fallbackImages.user,
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.image}>
                <User color={theme.colors.gray500} height={30} width={30} />
              </View>
            )}
          </View>
          <View>
            <Typography weight="medium" size="lg" color="white">
              স্বাগতম, {user?.name}
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
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray100,
    marginHorizontal: 5,
  },
});
