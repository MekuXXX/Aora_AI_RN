import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface SearchInputProps extends TextInputProps {}

export default function SearchInput(props: SearchInputProps) {
  const pathName = usePathname();
  const [query, setQuery] = useState<string>("");

  return (
    <View className="flex-row items-center w-full h-16 px-4 border-2 dark:text-white border-black-200 bg-black-100 rounded-2xl focus:border-secondary font-psemibold">
      <TextInput
        className="flex-1 mr-2 text-base dark:text-white font-psemibold"
        value={query}
        placeholderTextColor='#CDCDE0'
        onChangeText={(new_query: string) => setQuery(new_query)}
        {...props}
      />

      <TouchableOpacity onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input something to search results across database")
          }
          
          if (pathName.startsWith('/search/')) {
            router.setParams({query});
          }
          else {
            router.push(`search/${query}`);
          }
        }}
      >
        <Image source={Icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
