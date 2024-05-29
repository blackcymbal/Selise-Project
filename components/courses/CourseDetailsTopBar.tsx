import theme from "@/constants/theme";
import { useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "../../assets/icons/icons";
import { Typography } from "../ui";

type props = {
  title: string | string[] | undefined;
};

const CourseDetailsTopBar = ({ title }: props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <ArrowLeft height={32} width={32} color={theme.colors.gray600} />
        </TouchableOpacity>
        <Typography weight="bold" size="lg" color="gray900">
          {title}
        </Typography>
      </View>
    </SafeAreaView>
  );
};

export default CourseDetailsTopBar;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  innerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 5,
  },
  button: { padding: 5, paddingLeft: 0 },
});
