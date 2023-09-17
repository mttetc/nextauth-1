import Link from 'next/link';
import { getServerSession } from "next-auth"
import UserAccountNav from '@/components/UserAccountNav';
import { authOptions } from '@/lib/auth';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
            <div className='container flex items-center justify-between m-auto px-3 sm:px-0'>
                <Link href='/'>
                    Home
                </Link>
                {session?.user ?
                    <UserAccountNav />
                    :
                    <Link className="btn btn-primary" href='/sign-in'>
                        Sign in
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;