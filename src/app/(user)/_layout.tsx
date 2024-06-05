import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@hooks/useColorScheme";
import { useAuth } from "@/providers/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null }} // so this does not appear as a separate tab
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pizza-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
