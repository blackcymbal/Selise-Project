import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is a Welcome screen for new users</Text>
      <Text>Still under constructed</Text>
      <Link href="/screens" asChild style={{ marginVertical: 20 }}>
        <TouchableOpacity>
          <Text>Go to Home Screen</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/signin" asChild style={{ marginVertical: 20 }}>
        <TouchableOpacity>
          <Text>Go to Sign In Screen</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
