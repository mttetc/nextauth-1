'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password
        })

        console.log(signInData)
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <Controller
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" {...field} />
                        </>
                    )}
                />
                <Controller
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" {...field} />
                        </>
                    )}
                />
                <button className="btn btn-primary mt-4" type="submit">Sign in</button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/sign-up'>
                    Sign up
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignInForm;