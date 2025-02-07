"use client";

import { signIn, useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

const LoginContent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        // Redirect to the home page if already logged in
        router.push("/dashboard");
        return null;
    }

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center p-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardFooter>
                    {/* Google Sign In Button */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <FaGoogle className="text-red-500 mr-3" />
                        <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
};

const LoginPage = () => {
    return (
        <SessionProvider>
            <LoginContent />
        </SessionProvider>
    );
};

export default LoginPage;
