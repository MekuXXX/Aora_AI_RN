import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "./Themed";

interface CustomButtonProps extends ButtonProps {
  className?: string;
  textStyles?: string;
}

export default function CustomButton({
  className,
  textStyles,
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={`bg-secondary rounded-xl min-h-[48px] justify-center items-center ${className} ${
        props.disabled && "opacity-50"
      }`}
    >
      <ThemedText className={`text-lg font-psemibold ${textStyles}`}>
        {props.title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
