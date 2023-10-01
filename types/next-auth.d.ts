import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        email: string;
        id: string;
        username: string;
        createdAt: Date;
        updateUt: Date;
        accessToken: string;
    }
    interface Session {
        user: User;
        token: {
            username: string;
        };
    }
}
