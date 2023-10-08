"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import ThemeProvider from "./providers/ThemeProvider";

const Provider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
    );
};

export default Provider;
