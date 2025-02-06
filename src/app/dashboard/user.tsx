"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function User() {
    const { data: session, status } = useSession();

    let user = session?.user;

    user = {
        name: "John Doe",
        email: "test@gmail.com",
        image: "/placeholder-user.jpg",
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Image
                        src={user?.image ?? "/placeholder-user.jpg"}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                {user ? (
                    <DropdownMenuItem>
                        <button
                            onClick={() => {
                                signOut({ callbackUrl: "/" });
                            }}
                        >
                            Sign Out
                        </button>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem>
                        <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
