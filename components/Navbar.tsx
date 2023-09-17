import Link from 'next/link';
import { getServerSession } from "next-auth"
import UserAccountNav from '@/components/UserAccountNav';
import { authOptions } from '@/lib/auth';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="navbar bg-base-100 px-6">
            <div className="flex-1">
                <Link className="btn btn-outline btn-sm"  href='/'>
                    Home
                </Link>
            </div>
            <div className="flex-none">
                {session?.user ?
                    <UserAccountNav />
                    :
                    <Link className="btn btn-primary btn-sm" href='/sign-in'>
                        Sign in
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;