import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Images } from "@/constants";
import FormField from "@/components/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { SignInSchemaType } from "@/schemas/SignIn";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedText } from "@/components/Themed";

const schema = z.object({
  email: z.string().email("Email is invalid").min(2),
  password: z.string().min(6, "Password minimum characters are 6"),
});

export default function SignInScreen() {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      await signIn(data);
      const user = await getCurrentUser();
      setUser(user ?? null);
      setIsLoggedIn(user ? true : false);
      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View className="items-center w-full h-full px-4 mt-12 mb-6">
      <Image
        source={Images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />
      <ThemedText className="mt-6 text-2xl font-psemibold">
        Login to Aora
      </ThemedText>
      <View className="w-full mt-8 space-y-4">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Email"
              placeholderTextColor={"#7b7b8b"}
              placeholder="Enter your email address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email}
              keyboardType="email-address"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Password"
              placeholder="Enter your password"
              placeholderTextColor={"#7b7b8b"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password}
              secureTextEntry={true}
            />
          )}
          name="password"
        />

        <CustomButton
          title="Sign in"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>

      <View className="flex-row items-center justify-center w-full gap-2 pt-5">
        <Text className="text-lg text-gray-100 font-pregular">
          Don't have an account?
        </Text>
        <Link href={"/sign-up"} className="font-psemibold text-secondary">
          Sign up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
