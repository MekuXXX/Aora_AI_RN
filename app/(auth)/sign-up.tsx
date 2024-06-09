import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Images } from "@/constants";
import FormField from "@/components/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/SignUp";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function SignUpScreen() {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const user = await createUser(data);

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
      <Text className="mt-6 text-2xl text-white font-psemibold">
        Login to Aora
      </Text>
      <View className="w-full mt-8 space-y-4">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title="Username"
              placeholderTextColor={"#7b7b8b"}
              placeholder="Enter your username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.username}
            />
          )}
          name="username"
        />
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
          title="Sign up"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>

      <View className="flex-row items-center justify-center w-full gap-2 pt-5">
        <Text className="text-lg text-gray-100 font-pregular">
          Have an account?
        </Text>
        <Link href={"/sign-up"} className="font-psemibold text-secondary">
          Sign in
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
