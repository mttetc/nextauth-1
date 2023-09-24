"use client";

import { signIn, useSession } from "next-auth/react";

const HomePage = () => {
    const { data, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <span className="loading loading-spinner loading-sm"></span>
            </div>
        );
    }

    if (data?.user) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-5xl">Hello there, {data.user.username}!</h1>
            </div>
        );
    }

    return (
        <div className="flex bg-base-300 flex-1 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-8xl">Hello there!</h1>
            <p className="md:text-2xl pt-4 pb-6 md:pb-10">
                It seems that you are not signed in.
            </p>
            <button
                className="btn btn-primary md:btn-lg"
                onClick={() => signIn()}
            >
                Sign in
            </button>
        </div>
    );
};

export default HomePage;
