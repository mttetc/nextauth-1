"use client";

import {
    SignInFormSchema,
    SignInForm as TSignInForm,
} from "@/validation/SignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

        const request = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });

        if (request?.error) {
            toast.error(`Sign in failed: ${request.error}`);
            return;
        }

        toast.error("Sign in successful");
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
            <p className="text-center text-sm marker:mt-2">
                If you don&apos;t have an account, please&nbsp;
                <Link className="link link-primary" href="/sign-up">
                    sign up
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignInForm;
