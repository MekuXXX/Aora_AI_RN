import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { fetchVideos } from "@/lib/appwrite";
import { useAppWrite } from "@/hooks/useAppWrite";
import { VideoType } from "@/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Query } from "react-native-appwrite/src";
import { ThemedSafeAreaView } from "@/components/Themed";

export default function HomeScreen() {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // TODO: Add loading to videos
  const {
    data: videos,
    isError: videosIsError,
    isLoading: videosIsLoading,
    error: videosError,
    refetch: videosRefetch,
  } = useAppWrite<VideoType[]>(fetchVideos);

  // TODO: Adding loading to latest videos
  const {
    data: latestVideos,
    isError: latestVideosIsError,
    isLoading: latestVideosIsLoading,
    error: latestVideosError,
  } = useAppWrite<VideoType[]>(() =>
    fetchVideos([Query.orderDesc("$createdAt"), Query.limit(7)])
  );

  const onRefresh = () => {
    setRefreshing(true);
    videosRefetch();
    setRefreshing(false);
  };

  if (videosIsError) {
    Alert.alert("Error", videosError);
  }

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 my-6">
              <View className="flex-row items-start justify-between mb-6">
                <View>
                  <Text className="text-sm font-pmedium dark:text-gray-100">
                    Welcome back,
                  </Text>
                  <Text className="text-2xl font-psemibold dark:text-white">
                    {user?.username}
                  </Text>
                </View>
                <View>
                  <Image
                    source={Images.logoSmall}
                    className="h-9 w-9"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput placeholder="Search for a video topic" />

              <View className="flex-1 w-full pt-5 pb-8">
                <Text className="mb-3 text-lg dark:text-gray-100 font-pregular">
                  Latest Videos
                </Text>
                <Trending posts={latestVideos} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Text>HomeScreen</Text>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
