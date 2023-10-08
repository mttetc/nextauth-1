import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "./jwt";
import { nanoid } from "nanoid";

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
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email!,
                },
            });

            if (!dbUser) {
                token.id = user.id;
                return token;
            }

            if (!dbUser.username) {
                await prisma.user.update({
                    where: {
                        id: dbUser.id,
                    },
                    data: {
                        username: nanoid(10),
                    },
                });
            }

            return {
                id: dbUser.id,
                username: dbUser.username,
                email: dbUser.email,
                picture: dbUser.image,
                name: dbUser.name,
            };
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.name = token.name;
            }

            return session;
        },
        redirect() {
            return "/";
        },
    },
};

export async function signInWithCredentials(credentials: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findFirst({
        where: {
            email: credentials.email,
        },
    });

    if (!user || !user.password) {
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

export const getAuthSession = () => getServerSession(authOptions);
