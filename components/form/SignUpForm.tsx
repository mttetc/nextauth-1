'use client';

import Button from '@/designSystem/Button';
import { Input } from '@/designSystem/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
        } else {
            console.error("Registration failed")
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <Controller
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <Input placeholder='johndoe' {...field} />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <Input placeholder='mail@example.com' {...field} />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <Input
                                type='password'
                                placeholder='Enter your password'
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <Input
                                placeholder='Re-Enter your password'
                                type='password'
                                {...field}
                            />
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Sign up
                </Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/sign-in'>
                    Sign in
                </Link>
            </p>
        </FormProvider>
    );
};

export default SignUpForm;
