import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { VideoType } from "@/appwrite";
import icons from "@/constants/icons";
import { Images } from "@/constants";
import Avatar from "./Avatar";

type VideoCardProps = {
  video: VideoType;
};

export default function VideoCard({ video }: VideoCardProps) {
  const { title, thumbnail, video: videoLink, users } = video;
  const { username, avatar } = users;
  const [play, setPlay] = useState<boolean>(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="flex-row items-start justify-center flex-1">
          <Avatar uri={avatar} />
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm dark:text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs dark:text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative items-center justify-center w-full mt-3 h-60 rounded-xl"
        >
          <Image
            source={Images.cards}
            className="w-full h-full"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
