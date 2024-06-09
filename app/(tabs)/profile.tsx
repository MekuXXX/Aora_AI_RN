import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserVideos, signOut } from "@/lib/appwrite";
import { useAppWrite } from "@/hooks/useAppWrite";
import { VideoType } from "@/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import icons from "@/constants/icons";
import Avatar from "@/components/Avatar";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  // TODO: Add loading spinner
  const {
    data: videos,
    isError: videosIsError,
    isLoading: videosIsLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useAppWrite<VideoType[]>(getUserVideos, [user?.$id]);

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
    <SafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="items-center justify-center w-full px-4 mt-6 mb-12">
              <TouchableOpacity
                className="items-end w-full mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
