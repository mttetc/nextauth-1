"use client";

import { useSession } from "next-auth/react";

const User = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <span className="loading loading-spinner loading-sm"></span>;
    }

    return <div>hello {session?.user.name}!</div>;
};

export default User;
