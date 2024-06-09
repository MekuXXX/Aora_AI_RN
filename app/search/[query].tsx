import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchVideos } from "@/lib/appwrite";
import { useAppWrite } from "@/hooks/useAppWrite";
import { VideoType } from "@/appwrite";
import VideoCard from "@/components/VideoCard";

export default function QuerySearchScreen() {
  const { query } = useLocalSearchParams();

  // TODO: Add loading spinner
  const {
    data: videos,
    isError: videosIsError,
    isLoading: videosIsLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useAppWrite<VideoType[]>(searchVideos, [query]);

  if (videosIsError) {
    Alert.alert("Error", videosError);
  }

  useEffect(() => {
    refetchVideos();
  }, [query]);

  return (
    <SafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 my-6">
              <Text className="text-sm font-pmedium dark:text-gray-100">
                Search results
              </Text>
              <Text className="text-2xl font-psemibold dark:text-white">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput placeholder="Search for a video topic" />
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
