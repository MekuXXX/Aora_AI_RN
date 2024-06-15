import * as ImagePicker from "expo-image-picker";
import { FILE_TYPE } from "@/lib/file-type";

export async function openPicker(
  type: FILE_TYPE,
  onChange: (...event: any[]) => void
) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:
      type === FILE_TYPE.IMAGE
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    onChange(result.assets[0]);
  }
}
