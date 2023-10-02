"use client";

import { signUpWithCredentials } from "@/actions/auth";
import {
    SignUpFormSchema,
    SignUpForm as TSignUpForm,
} from "@/validation/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUpForm = () => {
    const form = useForm<TSignUpForm>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: TSignUpForm) => {
        const response = await signUpWithCredentials(values);

        if (response.success) {
            toast.success("Registration successful");
            signIn();
            return;
        }

        toast.error(`Registration failed: ${response.error}`);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col"
            >
                <Controller
                    control={form.control}
                    name="username"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Username</span>
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
                <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <label className="label">
                                <span className="label-text">
                                    Confirm password
                                </span>
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
                    Sign up
                </button>
            </form>
            <div className="divider">OR</div>
            <p className="text-center text-sm text-gray-600 mt-2">
                If you don&apos;t have an account, please&nbsp;
                <Link className="link link-primary" href="/sign-in">
                    sign in
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignUpForm;
