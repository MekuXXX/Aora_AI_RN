import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Controller, useForm } from "react-hook-form";
import { VideoUploadSchemaType } from "@/schemas/Video";
import { ResizeMode, Video } from "expo-av";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import { openPicker } from "@/lib/picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FILE_TYPE } from "@/lib/file-type";

export default function CreateScreen() {
  const { user } = useGlobalContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VideoUploadSchemaType>({
    // resolver: zodResolver(SignUpSchema),
    defaultValues: {
      title: "",
      prompt: "",
      video: {},
      thumbnail: {},
    },
  });

  const onSubmit = async (videoData: VideoUploadSchemaType) => {
    try {
      await createVideo(user?.$id!, videoData);
      Alert.alert("Success", "Video upload successfully");
      reset();
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="px-4 my-10">
        <Text className="text-2xl dark:text-white font-psemibold">
          Upload video
        </Text>

        <Controller
          control={control}
          name="title"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Video Title"
              placeholderTextColor={"#7b7b8b"}
              placeholder="Give your video a catch title..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title}
            />
          )}
        />

        <Controller
          control={control}
          name="video"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-7 space-y-2">
              <Text className="text-base dark:text-gray-100 font-pmedium">
                Upload Video
              </Text>
              <TouchableOpacity
                onPress={() => openPicker(FILE_TYPE.VIDEO, onChange)}
              >
                {Object.keys(value).length !== 0 ? (
                  <>
                    <Video
                      source={{ uri: value.uri }}
                      resizeMode={ResizeMode.COVER}
                      className="w-full h-64 rounded-2xl"
                    />
                  </>
                ) : (
                  <View className="w-full h-40 px-4 dark:bg-black-100 rounded-2xl justify-center items-center">
                    <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                      <Image
                        source={icons.upload}
                        className="w-1/2 h-1/2"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
                {Object.keys(value).length !== 0 && (
                  <TouchableOpacity
                    className="absolute top-10 right-4 w-6 h-6 flex items-center justify-center bg-secondary-200 rounded-full"
                    onPress={() => onChange({})}
                  >
                    <Text className="text-sm dark:text-white font-pbold">
                      X
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
          )}
        />

        <Controller
          control={control}
          name="thumbnail"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View className="mt-7 space-y-2 relative">
              <Text className="text-base dark:text-gray-100 font-pmedium">
                Thumbnail Image
              </Text>
              <TouchableOpacity
                className="relative"
                onPress={() => openPicker(FILE_TYPE.IMAGE, onChange)}
              >
                {Object.keys(value).length !== 0 ? (
                  <Image
                    source={{ uri: value.uri }}
                    className="w-full h-64 rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full border-black-200 h-40 px-4 dark:bg-black-100 rounded-2xl justify-center items-center">
                    <Image
                      source={icons.upload}
                      className="w-1/2 h-1/2"
                      resizeMode="contain"
                    />
                    <Text className="text-sm dark:text-gray-100 font-pmedium">
                      Choose file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {Object.keys(value).length !== 0 && (
                <TouchableOpacity
                  className="absolute top-10 right-4 w-6 h-6 flex items-center justify-center bg-secondary-200 rounded-full"
                  onPress={() => onChange({})}
                >
                  <Text className="text-sm dark:text-white font-pbold">X</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="prompt"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="AI Prompt"
              placeholderTextColor={"#7b7b8b"}
              placeholder="The prompt you used to create thi video"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.prompt}
            />
          )}
        />

        <CustomButton
          title="Submit & Publish"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
