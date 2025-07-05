// src/pages/Signup.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { signupUser } from '../api/auth';
import { useEffect } from "react";



const formSchema = z
    .object({
        email: z.string().email("Invalid email"),
        accountType: z.enum(["SELLER", "CUSTOMER"]),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type SignupFormData = z.infer<typeof formSchema>;

export default function Signup() {

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);


    const form = useForm<SignupFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            accountType: "CUSTOMER",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: SignupFormData) => {
        handleSignup(values);
    };

    const handleSignup = async (values: SignupFormData) => {
        console.log("Signup values:", values);
        try {
            const user = await signupUser(values.email, values.password, values.accountType);
            login(user);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('Signup failed');
        }
    }


    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
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
                        name="accountType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-4"
                                    >
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="CUSTOMER" id="customer" />
                                            <Label htmlFor="customer">Customer</Label>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="SELLER" id="seller" />
                                            <Label htmlFor="seller">Seller</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl><Input type="password" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Sign Up</Button>

                    <div className="mt-4 text-center text-sm">
                        Already have an account? Login{" "}
                        <a href="/login" className="underline underline-offset-4">
                            here
                        </a>
                    </div>
                </form>
            </Form>
        </div>
    );
}
