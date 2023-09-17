'use client';

import { signOut } from "next-auth/react";

const UserAccountNav = () => {
    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: `${window.location.origin}/sign-in` });
    }

    return (
        <button className="btn btn-primary btn-sm" onClick={handleSignOut}>
            Sign out
        </button>
    )
}

export default UserAccountNav;