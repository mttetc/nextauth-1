"use client";

import { useSession } from "next-auth/react";

const User = () => {
    const { data: session } = useSession();

    return <div>hello {session?.user.name}!</div>;
};

export default User;
