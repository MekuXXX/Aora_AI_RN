import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VideoType } from "@/appwrite";
import { Icons } from "@/constants";
import Avatar from "./Avatar";
import { addBookmark, isBookmarked, removeBookmark } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ResizeMode, Video } from "expo-av";

type VideoCardProps = {
  video: VideoType;
  refreshFn?: () => void;
};

export default function VideoCard({ video, refreshFn }: VideoCardProps) {
  const { user } = useGlobalContext();
  const [isBookmarkedVideo, setIsBookmarkedVideo] = useState<boolean>(false);
  const { title, thumbnail, video: videoLink, creator } = video;
  const { username, avatar } = creator;
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    const fn = async () => {
      const isBooked = await isBookmarked(user?.$id!, video.$id);
      setIsBookmarkedVideo(isBooked);
    };

    fn();
  }, []);

  const handleBookmarking = async () => {
    if (!isBookmarkedVideo) {
      await addBookmark(user?.$id!, video.$id);
    } else {
      await removeBookmark(user?.$id!, video.$id);
    }

    if (refreshFn) {
      refreshFn();
    }
    setIsBookmarkedVideo((prev) => !prev);
  };

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

        <TouchableOpacity onPress={handleBookmarking}>
          <View className="pt-2">
            {isBookmarkedVideo ? (
              <Image
                source={Icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Icons.bookmark}
                className="w-6 h-6"
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: videoLink }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative items-center justify-center w-full mt-3 h-60 rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />

          <Image
            source={Icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
