import * as z from "zod";

const ImagePickerAssetSchema = z.object({
  uri: z.string().url({ message: "Must be a valid URL" }),
  width: z.number(),
  height: z.number(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  assetId: z.string().nullable().optional(),
  type: z.enum(["image", "video"]).optional(),
  fileName: z.string().nullable().optional(),
  exif: z.record(z.any()).nullable().optional(),
  base64: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
});

export const VideoUploadSchema = z.object({
  title: z.string().min(1, "Title must be more that more 1 character"),
  prompt: z.string().min(1, "Prompt must be more that more 1 character"),
  thumbnail: ImagePickerAssetSchema,
  video: ImagePickerAssetSchema,
});

export type BaseFileSchemaType = z.infer<typeof ImagePickerAssetSchema>;
export type VideoUploadSchemaType = z.infer<typeof VideoUploadSchema>;
