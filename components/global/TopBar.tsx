import { Notification, Search, User } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { FilePathUtils, fallbackImages } from "@/utils";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../ui";

const TopBar = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.inner}>
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
                <User color={theme.colors.gray500} height={22} width={22} />
              </View>
            )}
          </View>
          <View style={styles.welcomeView}>
            <Typography weight="medium" size="lg" color="gray900">
              {user?.name}
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
    backgroundColor: theme.colors.white,
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
  image: {
    height: 32,
    width: 32,
    borderRadius: 32,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    backgroundColor: theme.colors.gray100,
  },
});
