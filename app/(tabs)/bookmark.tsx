import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useAppWrite } from "@/hooks/useAppWrite";
import { VideoType } from "@/appwrite";
import VideoCard from "@/components/VideoCard";
import { fetchVideos, getBookmarkedVideos } from "@/lib/appwrite";
import { Query } from "react-native-appwrite/src";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function QuerySearchScreen() {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // TODO: Add loading spinner
  const {
    data: videos,
    isError: videosIsError,
    isLoading: videosIsLoading,
    error: videosError,
    refetch: videosRefetch,
  } = useAppWrite<VideoType[]>(getBookmarkedVideos, [user?.$id]);

  if (videosIsError) {
    Alert.alert("Error", videosError);
  }

  const onRefresh = () => {
    setRefreshing(true);
    videosRefetch();
    setRefreshing(false);
  };

  useEffect(() => {
    videosRefetch();
  }, [user]);

  return (
    <SafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} refreshFn={videosRefetch} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 my-6">
              <Text className="text-sm font-pmedium dark:text-gray-100">
                Bookmarked
              </Text>
              <Text className="text-2xl font-psemibold dark:text-white">
                {user?.username}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  placeholder="Search in the bookmarked videos"
                  path="search/bookmarked"
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
