'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const router = useRouter();
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

        if (signInData?.error) {
            console.error(signInData.error)
            toast.error("Sign in failed")
        } else {
            // router.refresh();
            console.log("success!")
            router.push('/admin');
            toast.success("Sign in successful");
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <Controller
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs" {...field} />
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
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs" {...field} />
                        </>
                    )}
                />
                <button className="btn btn-primary mt-4 w-full" type="submit">Sign in</button>
            </form>
            <div className="divider">OR</div>
            <p className='text-center text-sm marker:mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className="link link-primary" href='/sign-up'>
                    Sign up
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignInForm;