"use client";

import {
    SignInFormSchema,
    SignInForm as TSignInForm,
} from "@/src/lib/validators/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const SignInForm = () => {
    const form = useForm<TSignInForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(SignInFormSchema),
    });

    const onSubmit = async (values: TSignInForm) => {
        const { email, password } = values;

        try {
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
            });
            toast.success("Sign in successful");
        } catch (error) {
            toast.error(`Sign in failed: ${error}`);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signIn("google");
        } catch (error) {
            toast.error(`Sign in failed: ${error}`);
            return;
        }
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col"
            >
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered input-primary w-full max-w-xs"
                                {...field}
                            />
                            {error && (
                                <p className="text-error">{error.message}</p>
                            )}
                        </>
                    )}
                />
                <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered input-primary w-full max-w-xs"
                                {...field}
                            />
                            {error && (
                                <p className="text-error">{error.message}</p>
                            )}
                        </>
                    )}
                />
                <button className="btn btn-primary mt-4 w-full" type="submit">
                    Sign in
                </button>
            </form>
            <div className="divider">OR</div>
            <button
                className="btn btn-outline w-full"
                onClick={signInWithGoogle}
            >
                <FcGoogle />
                Google
            </button>
            <p className="text-center text-sm mt-4 marker:mt-2">
                If you don&apos;t have an account, please&nbsp;
                <Link className="link link-primary" href="/sign-up">
                    sign up
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignInForm;
