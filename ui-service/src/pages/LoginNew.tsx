
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { useEffect } from "react";



const formSchema = z
    .object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password is required")
    });

export type LoginFormData = z.infer<typeof formSchema>;

export default function LoginNew() {

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);


    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (values: LoginFormData) => {
        handleLogin(values);
    };

    const handleLogin = async (values: LoginFormData) => {
        try {
            const token = await loginUser(values.email, values.password);
            login(token);
            navigate('/');
        } catch (err) {
            alert('Login failed');
        }
    };


    return (

        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type="password" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <Button type="submit" className="w-full">Log in</Button>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account? Sign up{" "}
                        <a href="/signup" className="underline underline-offset-4">
                            here
                        </a>


                    </div>

                    <div className="mt-4 text-center text-sm">
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>


                    </div>


                </form>
            </Form>
        </div>
    );
}
