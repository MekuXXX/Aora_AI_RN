import { TouchableOpacity } from "react-native";
import React from "react";

export default function ToggleThemeButton() {
  return (
    <TouchableOpacity onPress={() => toggleTheme()}>
      <Image
        source={theme === "dark" ? Icons.lightMode : Icons.nightMode}
        className="w-8 h-8"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
