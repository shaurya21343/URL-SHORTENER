'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn } from 'next-auth/react'; // ✅ 
import { toast } from 'sonner'; // ✅
import { auth } from '@/auth';
import { useEffect } from 'react';

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    // Check if user is already authenticated
    

    const error = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('error') : null; // Get error from URL query params
    if (error) {
        toast.error('email or password is not valid'); // Show error message
    }
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {

    try {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/', // Redirect to home page after successful login
      });
        toast.success('Login successful!'); // Show success message
        

    // Add login API logic here
  }
    catch (error) {
      console.error('Login failed:', error);
        toast.error('Login failed. Please check your credentials and try again.'); // Show error message
      // Handle login error, e.g., show a toast notification
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
