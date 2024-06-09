import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";

type InfoBoxProps = ViewProps & {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
};

export default function InfoBox(props: InfoBoxProps) {
  const { title, titleClassName, subtitle, subtitleClassName, ...viewProps } =
    props;

  return (
    <View {...viewProps}>
      <Text
        className={`dark:text-white text-center font-psemibold ${titleClassName}`}
      >
        {title}
      </Text>
      <Text
        className={`dark:text-gray-100 text-sm text-center font-pregular ${subtitleClassName}`}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
