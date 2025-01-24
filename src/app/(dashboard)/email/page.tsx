import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BubbleText from "@/components/ui/bubble";
import { BrandDropdown } from "@/components/ui/brand";
import SendInput from "@/components/ui/send-input";
import { fetchAllBrands } from "@/app/api/endpoints/dealsEndpoints";

// Mock function to simulate email fetching
async function fetchEmails() {
    return [
        { text: "This is a bubble text component 1", sender: false },
        { text: "This is a bubble text component 2", sender: true },
        { text: "This is a bubble text component 3", sender: false },
        { text: "This is a bubble text component 4", sender: true },
    ];
}

export default async function EmailPage() {
    const brands = (await fetchAllBrands()) || [];
    // Fetch the emails server-side
    const emails = await fetchEmails();

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
                                text={email.text}
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
