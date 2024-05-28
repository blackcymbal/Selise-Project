import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("screens");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Go</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("signin")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
