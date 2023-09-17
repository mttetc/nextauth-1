'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

const FormSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

const SignUpForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            })
        })

        if (response.ok) {
            router.push('/sign-in');
            toast.success("Registration successful");
        } else {
            console.error("Registration failed")
            toast.error("Registration failed");
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <Controller
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs" {...field} />
                        </>
                    )}
                />
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
                <Controller
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <>
                            <label className="label">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs" {...field} />
                        </>
                    )}
                />
                <button className="btn btn-primary mt-4 w-full" type="submit">Sign up</button>
            </form>
            <div className="divider">OR</div>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='link link-primary' href='/sign-in'>
                    sign in
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignUpForm;
