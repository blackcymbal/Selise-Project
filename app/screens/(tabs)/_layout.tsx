import { navList } from "@/config";
import theme from "@/constants/theme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primaryDefault,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      }}
    >
      {navList.map((item, idx) => (
        <Tabs.Screen
          key={idx}
          name={item.navTo}
          options={{
            title: item.name,
            tabBarIcon: ({ color, focused }) => (
              <item.icon
                width={30}
                height={30}
                color={
                  focused
                    ? theme.colors.primaryDefault
                    : theme.colors.grayDefault
                }
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: theme.colors.white,
    height: 84,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: "AnekBangla-Regular",
    marginBottom: Platform.OS === "ios" ? 0 : 8,
  },
  tabBarItemStyle: {
    gap: Platform.OS === "ios" ? 4 : 0,
    top: Platform.OS === "ios" ? 12 : 8,
  },
});
