import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Icons } from "@/constants";
import * as Animatable from "react-native-animatable";

type ToggleThemeButtonProps = TouchableOpacityProps & {};

export default function ToggleThemeButton(props: ToggleThemeButtonProps) {
  const { theme, toggleTheme } = useGlobalContext();
  const [animation, setAnimation] = useState<"fadeOut" | "fadeIn">("fadeIn");

  const handlePress = () => {
    setAnimation("fadeOut");
  };

  return (
    <Animatable.View
      animation={animation}
      duration={200}
      onAnimationEnd={() => {
        if (animation === "fadeOut") {
          toggleTheme();
          setAnimation("fadeIn");
        }
      }}
    >
      <TouchableOpacity onPress={handlePress} {...props}>
        <Image
          source={theme === "dark" ? Icons.lightMode : Icons.nightMode}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});
