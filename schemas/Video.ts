import * as z from "zod";

const BaseFileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" }),
  uri: z.string().url({ message: "Must be a valid URL" }),
  size: z.number(),
  mimeType: z.string().optional(),
  lastModified: z.number().optional(),
  file: z.any().optional(),
});

const ThumbnailSchema = BaseFileSchema.extend({
  name: z
    .string()
    .min(1, { message: "Thumbnail name must be at least 1 character long" }),
  uri: z.string().url({ message: "Thumbnail must be a valid URL" }),
});

const VideoSchema = BaseFileSchema.extend({
  uri: z.string().url({ message: "Video must be a valid URL" }),
  name: z
    .string()
    .min(1, { message: "Video name must be at least 1 character long" }),
});

export const VideoUploadSchema = z.object({
  title: z.string().min(1, "Title must be more that more 1 character"),
  prompt: z.string().min(1, "Prompt must be more that more 1 character"),
  thumbnail: ThumbnailSchema,
  video: VideoSchema,
});

export type BaseFileSchemaType = z.infer<typeof BaseFileSchema>;
export type VideoUploadSchemaType = z.infer<typeof VideoUploadSchema>;
