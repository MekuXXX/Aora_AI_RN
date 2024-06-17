import {
  Alert,
  Image,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { ThemeTextInput } from "./Themed";

interface SearchInputProps extends TextInputProps {
  path?: string;
}

export default function SearchInput({
  path = "search",
  ...props
}: SearchInputProps) {
  const pathName = usePathname();
  const [query, setQuery] = useState<string>("");

  return (
    <View className="w-full h-16 relative">
      <ThemeTextInput
        className="w-full h-16 pr-14"
        value={query}
        onChangeText={(new_query: string) => setQuery(new_query)}
        {...props}
      />

      <TouchableOpacity
        className="absolute top-1/3 right-4"
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }

          if (pathName.startsWith("/search/")) {
            router.setParams({ query });
          } else {
            router.push(`${path}/${query}`);
          }
        }}
      >
        <Image source={Icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
