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
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(
                    credentials.password,
                    existingUser.password
                );

                if (!passwordMatch) {
                    return null;
                }

                const { password, ...userWithoutPassword } = existingUser;

                const accessToken = signJwtAccessToken(userWithoutPassword);
                const result = {
                    ...userWithoutPassword,
                    accessToken,
                };

                return {
                    ...result,
                    id: result.id.toString(),
                };
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
