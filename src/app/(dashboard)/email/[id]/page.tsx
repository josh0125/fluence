"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BubbleText from "@/components/ui/bubble";
import { BrandDropdown } from "@/components/ui/brand";
import SendInput from "@/components/ui/send-input";
import { fetchAllBrands } from "@/app/api/endpoints/dealsEndpoints";
import { fetchMessages } from "@/app/api/endpoints/messageEndpoints";

export default function EmailPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    // need to use path to get brand_id
    const { id: brand_id } = useParams();

    const [brands, setBrands] = useState<any[]>([]);
    const [email, setEmail] = useState("");
    const [emails, setEmails] = useState<any[]>([]);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const name = session.user.name || "Unknown";
            const email = session.user.email || "";

            if (email) {
                setEmail(email);
                handleFetchBrand();
                handleFetchMessages(Number(brand_id), email);
            }
        }

        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, session]);

    const handleFetchMessages = async (brand_id: number, email: string) => {
        console.log("fetching messages", brand_id, email);
        const messages = (await fetchMessages(brand_id, email)) || [];
        setEmails(messages);
    };

    const handleFetchBrand = async () => {
        const brands = (await fetchAllBrands()) || [];
        setBrands(brands);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <BrandDropdown brands={brands} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col h-96 justify-between">
                    <div>
                        {emails.map((email, index) => (
                            <BubbleText
                                key={index}
                                text={email.content}
                                sender={email.sender}
                                image_url={null}
                            />
                        ))}
                    </div>
                    <SendInput />
                </div>
            </CardContent>
        </Card>
    );
}
