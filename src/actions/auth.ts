"use server";

import prisma from "@/src/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

type SignUpResult = {
    success: boolean;
    error?: string;
    data?: {
        id: string;
        email: string;
        username?: string;
    };
};

export async function signUpWithCredentials(credentials: {
    username: string;
    email: string;
    password: string;
}): Promise<SignUpResult> {
    const { success } = userSchema.safeParse(credentials);

    if (!success) {
        return { success: false, error: "Form is invalid" };
    }

    try {
        const existingUserByEmail = await prisma.user.findFirst({
            where: {
                email: credentials.email,
            },
        });

        if (existingUserByEmail) {
            return { success: false, error: "Email already exists" };
        }

        const existingUserByUsername = await prisma.user.findFirst({
            where: {
                username: credentials.username,
            },
        });

        if (existingUserByUsername) {
            return { success: false, error: "Username already exists" };
        }

        const hashedPassword = await hash(credentials.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: credentials.email,
                username: credentials.username,
                password: hashedPassword,
            },
        });

        const { password: newUserPassword, ...rest } = newUser;

        return { success: true, data: rest };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Error" };
    }
}
