import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, Text } from "react-native";

import { Icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedText } from "@/components/Themed";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: string;
  color: string;
  icon: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={props.icon}
        resizeMode="contain"
        tintColor={props.color}
        className="w-5 h-5"
      />
      <ThemedText
        className={`text-xs te ${
          props.focused ? "font-psemibold" : "font-pregular"
        }`}
      >
        {props.name}
      </ThemedText>
    </View>
  );
}

export default function TabLayout() {
  const { theme } = useGlobalContext();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#161622" : "#FFF",
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? "#232533" : "#EEE",
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={Icons.home}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={Icons.bookmark}
              name="Bookmark"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={Icons.plus}
              name="Create"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={Icons.profile}
              name="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
