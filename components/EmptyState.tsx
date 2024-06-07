import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type EmptyStateProps = {
  title: string;
  subtitle?: string;
};

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View className="items-center justify-center gap-2 px-4">
      <Image
        source={Images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-2xl capitalize font-psemibold dark:text-white">
        {title}
      </Text>

      {subtitle && (
        <Text className="text-sm font-pmedium dark:text-gray-100">
          {subtitle}
        </Text>
      )}

      <CustomButton
        title="Create Video"
        onPress={() => router.push("/create")}
        className="w-full"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
