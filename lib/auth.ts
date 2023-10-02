import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "./jwt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-out",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Username",
                    type: "text",
                    required: true,
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true,
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await signInWithCredentials(credentials);

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (!user) return token;

            return {
                ...token,
                ...user,
            };
        },
        async session({ session, token }) {
            return {
                ...session,
                user: token,
            };
        },
    },
};

export async function signInWithCredentials(credentials: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findUnique({
        where: {
            email: credentials.email,
        },
    });

    if (!user) {
        return null;
    }

    const passwordMatch = await compare(credentials.password, user.password);

    if (!passwordMatch) {
        return null;
    }
    const { password, ...userWithoutPassword } = user;
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = {
        ...userWithoutPassword,
        accessToken,
        id: user.id.toString(),
    };

    return result;
}
