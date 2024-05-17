import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Email is invalid").min(2),
  password: z.string().min(6, "Password minimum characters are 6"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
