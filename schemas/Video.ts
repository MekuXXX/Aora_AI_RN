import * as z from "zod";

// Define the schema for the thumbnail
const ThumbnailSchema = z.object({
  name: z.string().min(1, "Thumbnail name must be at least 1 character long"),
  uri: z.string().url("Thumbnail must be a valid URL"),
  size: z.number().optional(),
  mimeType: z.string().optional(),
  lastModified: z.number().optional(),
  file: z.instanceof(File).optional(),
});

// Define the schema for the video
const VideoSchema = z.object({
  uri: z.string().url("Video must be a valid URL"),
  name: z.string().min(1, "Video name must be at least 1 character long"),
  size: z.number().optional(),
  mimeType: z.string().optional(),
  lastModified: z.number().optional(),
  file: z.instanceof(File).optional(),
});

export const VideoUploadSchema = z.object({
  title: z.string().min(1, "Title must be more that more 1 character"),
  prompt: z.string().min(1, "Prompt must be more that more 1 character"),
  thumbnail: ThumbnailSchema,
  video: VideoSchema,
});

export type VideoUploadSchemaType = z.infer<typeof VideoUploadSchema>;
