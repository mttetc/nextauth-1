"use client";

import SignOut from "@/components/auth/SignOut";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
    const { data: user } = useSession();
    console.log("🚀 ~ file: Navbar.tsx:12 ~ Navbar ~ user:", user);

    return (
        <div className="navbar bg-base-200 px-6">
            <div className="flex-1">
                <Link className="btn btn-outline btn-sm" href="/">
                    Home
                </Link>
            </div>
            <div className="flex-none flex gap-4">
                <ThemeToggler />
                {user?.user && <SignOut />}
            </div>
        </div>
    );
};

export default Navbar;
