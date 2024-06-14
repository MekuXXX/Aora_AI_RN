import * as DoucmentPicker from "expo-document-picker";
import { Alert } from "react-native";

export enum PICKER_TYPE {
  VIDEO,
  IMAGE,
}

export function getPickerDataTypes(type: PICKER_TYPE): string[] {
  switch (type) {
    case PICKER_TYPE.IMAGE:
      return ["image/png", "image/jpg", "image/jpeg"];
    case PICKER_TYPE.VIDEO:
      return ["video/mp4", "video/gif"];
    default:
      throw new Error("Not valid picker type");
  }
}

export async function openPicker(
  type: PICKER_TYPE,
  onChange: (...event: any[]) => void
) {
  const result = await DoucmentPicker.getDocumentAsync({
    type: getPickerDataTypes(type),
  });

  if (!result.canceled) {
    onChange(result.assets[0]);
  } else {
    Alert.alert("Document picked", JSON.stringify(result, null, 2));
  }
}
