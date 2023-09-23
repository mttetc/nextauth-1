import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="navbar bg-base-200 px-6">
            <div className="flex-1">
                <Link className="btn btn-outline btn-sm" href="/">
                    Home
                </Link>
            </div>
            <div className="flex-none">
                <ThemeToggler />
                {session?.user && <SignOut />}
            </div>
        </div>
    );
};

export default Navbar;
