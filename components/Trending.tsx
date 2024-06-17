import { FlatList, StyleSheet, ViewToken } from "react-native";
import React, { useState } from "react";
import { VideoType } from "@/appwrite";
import TrendingItem from "@/components/TrendingItem";

type TrendingProps = {
  posts: VideoType[];
};

type ViewableItemsProps = {
  viewableItems: ViewToken<VideoType>[];
  changed: ViewToken<VideoType>[];
};

export default function Trending({ posts }: TrendingProps) {
  const [activeItemId, setActiveItemId] = useState(posts[1]?.$id ?? "");

  const viewableItemsChanged = ({ viewableItems }: ViewableItemsProps) => {
    if (viewableItems.length > 0) {
      setActiveItemId(viewableItems[1]?.key ?? "");
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItemId={activeItemId} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 100 }}
      horizontal
    />
  );
}

const styles = StyleSheet.create({});
