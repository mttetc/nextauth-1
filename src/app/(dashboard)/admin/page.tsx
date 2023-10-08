import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);

    return (
        <>
            <h2 className="text-5xl">
                Welcome to admin {session?.user.username}!
            </h2>
        </>
    );
};

export default page;
