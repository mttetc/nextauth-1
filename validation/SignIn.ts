import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have than 8 characters"),
});

export type SignInForm = z.infer<typeof SignInFormSchema>;
