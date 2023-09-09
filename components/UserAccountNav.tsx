'use client';

import { signOut } from "next-auth/react";

const UserAccountNav = () => {
    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: `${window.location.origin}/sign-in` });
    }

    return (
        <button className="btn-primary" onClick={handleSignOut}>
            Sign up
        </button>
    )
}

export default UserAccountNav;