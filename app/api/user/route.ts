import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import z from "zod"

// Define a schema for input validation
const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 });
        }
        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}