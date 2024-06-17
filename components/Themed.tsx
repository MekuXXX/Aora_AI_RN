import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
} from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export type ThemedSafeAreaViewProps = SafeAreaViewProps & {};
export function ThemedSafeAreaView(props: ThemedSafeAreaViewProps) {
  return (
    <SafeAreaView className="dark:bg-primary min-h-full pt-8 " {...props} />
  );
}

export type ThemedTextProps = TextProps & {};
export function ThemedText(props: ThemedTextProps) {
  return <Text className="text-black dark:text-white" {...props} />;
}

export type ThemedTextInputProps = TextInputProps & {};
export function ThemeTextInput({ className, ...props }: ThemedTextInputProps) {
  const { theme } = useGlobalContext();
  return (
    <TextInput
      placeholderTextColor={theme === "dark" ? "#CDCDE0" : "#7c8b97"}
      className={`px-4 text-base text-black dark:text-white border-2 border-black-200 dark:bg-black-100 rounded-2xl focus:border-secondary font-psemibold ${className}`}
      {...props}
    />
  );
}
