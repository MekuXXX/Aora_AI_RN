import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import { fetchVideos, signOut } from "@/lib/appwrite";
import { useAppWrite } from "@/hooks/useAppWrite";
import { VideoType } from "@/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Icons } from "@/constants";
import Avatar from "@/components/Avatar";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";
import { Query } from "react-native-appwrite/src";
import { ThemedSafeAreaView } from "@/components/Themed";
import ToggleThemeButton from "@/components/ToggleThemeButton";

export default function ProfileScreen() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  // TODO: Add loading spinner
  const {
    data: videos,
    isError: videosIsError,
    isLoading: videosIsLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useAppWrite<VideoType[]>(fetchVideos, [
    [Query.equal("creator", user?.$id!)],
  ]);

  if (videosIsError) {
    Alert.alert("Error", videosError);
  }

  useEffect(() => {
    refetchVideos();
  }, [user]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} noBookmark={true} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="items-center justify-center w-full px-4 mt-6 mb-12">
              <View className="flex-row justify-between w-full mb-10">
                <ToggleThemeButton />
                <TouchableOpacity onPress={logout}>
                  <Image
                    source={Icons.logout}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <Avatar uri={user?.avatar} width={75} height={75} />
              <InfoBox
                title={user?.username || ""}
                className="mt-5"
                titleClassName="text-lg"
              />

              <View className="flex-row mt-5">
                <InfoBox
                  title={`${videos.length || 0}`}
                  subtitle="Posts"
                  titleClassName="text-xl"
                  className="mr-10"
                />

                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  titleClassName="text-xl"
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
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
