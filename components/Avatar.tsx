import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

type AvatarProps = {
  image?: object;
  uri?: string;
  width?: number;
  height?: number;
};

export default function Avatar(props: AvatarProps) {
  let { image, uri, width, height } = props;

  return (
    <View
      className={`justify-center items-center p-0.5 rounded-lg border border-secondary`}
    >
      <Image
        source={image ? image : { uri }}
        className="w-full h-full rounded-lg"
        style={{
          width: width ?? 56,
          height: height ?? 56,
        }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
