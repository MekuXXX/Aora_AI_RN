import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FieldError } from "react-hook-form";
import { ThemeTextInput, ThemedTextInputProps } from "@/components/Themed";

interface FormFieldProps extends ThemedTextInputProps {
  title: string;
  titleClasses?: string;
  error?: FieldError;
}

export default function FormField({
  title,
  titleClasses,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <View className="mt-4 space-y-2">
      <Text
        className={`text-base dark:text-gray-100 font-psemibold ${titleClasses}`}
      >
        {title}
      </Text>
      <View>
        <ThemeTextInput className="w-full h-16" {...inputProps} />
        {error?.message && (
          <Text className="mt-1 text-red-500">{error.message}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
