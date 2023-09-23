import SignInForm from "@/components/auth/SignInForm";

const page = () => {
    return (
        <>
            <h1 className="text-5xl md:text-6xl">Sign in</h1>
            <div className=" bg-base-100 p-10 rounded-md">
                <SignInForm />
            </div>
        </>
    );
};

export default page;
