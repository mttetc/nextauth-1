import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { PropsWithChildren, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Simple social network",
    description: "A simple social network built with Next.js and Prisma.",
};

const RootLayout = async ({ children }: PropsWithChildren) => {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <div className="flex flex-col flex-1 min-h-screen">
                        <Navbar />
                        <div className="flex-1 flex bg-base-300">
                            {session?.user && <Sidebar />}
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
