import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as AnimaTable from "react-native-animatable";
import { VideoType } from "@/appwrite";
import { Icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

type TrendingItemProps = {
  activeItemId: string;
  item: VideoType;
};

const zoomIn = {
  from: {
    scaleX: 0.9,
    scaleY: 0.9,
  },

  to: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut = {
  from: {
    scaleX: 1,
    scaleY: 1,
  },

  to: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

export default function TrendingItem({
  activeItemId,
  item,
}: TrendingItemProps) {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <AnimaTable.View
      className="mr-5"
      animation={activeItemId === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          className="relative items-center justify-center"
          onPress={() => setPlay((prev) => !prev)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-52 rounded-[35px] my-5 overflow-clip dark:shadow-lg shadow-md dark:shadow-black/50"
            resizeMode="cover"
          />
          <Image
            source={Icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </AnimaTable.View>
  );
}

const styles = StyleSheet.create({});
