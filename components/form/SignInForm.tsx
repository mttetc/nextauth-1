'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
                <div className='space-y-2'>
                    <Controller
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <Input label="Email" placeholder='mail@example.com' {...field} />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <Input
                                type='password'
                                label="Password"
                                placeholder='Enter your password'
                                {...field}
                            />
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Sign in
                </Button>
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