import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Text, View } from "@/components/Themed";
import { Icons } from "@/constants";

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
      <Text
        className={`text-xs ${
          props.focused ? "font-psemibold" : "font-pregular"
        }`}
      >
        {props.name}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#FFA001",
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
