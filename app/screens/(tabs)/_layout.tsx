import TabBarButton from "@/components/navigation/TabBarButton";
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
      }}
    >
      {navList.map((item, idx) => (
        <Tabs.Screen
          key={idx}
          name={item.navTo}
          options={{
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                Icon={item.icon}
                name={item.name}
                navTo={item.navTo}
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
    paddingTop: Platform.OS === "ios" ? 12 : 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: "AnekBangla-Regular",
  },
});
