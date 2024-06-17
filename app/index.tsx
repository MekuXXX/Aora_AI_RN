import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedText, ThemedSafeAreaView } from "@/components/Themed";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <ThemedSafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4">
          <Image
            source={Images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={Images.cards}
            className="max-w-[380px] w-full max-h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <ThemedText className="text-3xl font-bold text-center">
              Discover Endless Possiblities with{" "}
              <Text className="font-extrabold text-secondary-200">Aora</Text>
            </ThemedText>
            <Image
              source={Images.path}
              resizeMode="contain"
              className="absolute -bottom-[10px] right-24 w-[75px] h-[20px]"
            />
          </View>

          <Text className="text-sm text-center text-gray-100 font-pregular mt-7">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            className="w-full text-center mt-7"
            onPress={() => router.push("/sign-in")}
          />

          <StatusBar backgroundColor={"#161622"} style={"inverted"} />
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
