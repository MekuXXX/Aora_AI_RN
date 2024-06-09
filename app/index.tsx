import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { Images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <SafeAreaView className="h-full">
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
            <Text className="text-3xl font-bold text-center text-white">
              Discover Endless Possiblities with{" "}
              <Text className="font-extrabold text-secondary-200">Aora</Text>
            </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
