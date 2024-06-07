import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps extends TextInputProps {
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
        className={`text-base text-gray-100 font-psemibold ${titleClasses}`}
      >
        {title}
      </Text>
      <View>
        <TextInput
          className="w-full h-16 px-4 text-base text-white border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary font-psemibold"
          {...inputProps}
        />
        {error && <Text className="mt-1 text-red-500">{error.message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
