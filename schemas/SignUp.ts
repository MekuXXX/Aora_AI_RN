import * as z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Email is invalid").min(2),
  password: z.string().min(6, "Password minimum characters are 6"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
