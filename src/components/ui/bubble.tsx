import React from "react";
import Image from "next/image";

interface BubbleTextProps {
    text: string;
    sender?: boolean;
    image_url: string | null;
}

const BubbleText: React.FC<BubbleTextProps> = ({ text, sender = false, image_url }) => {
    return (
        <div
            className={`flex items-center gap-2 ${sender ? "flex-row-reverse" : "flex-row"} mb-2`}
            style={{
                alignSelf: sender ? "flex-end" : "flex-start",
                margin: sender ? "0 0 10px auto" : "0 auto 10px 0",
            }}
        >
            {/* Avatar */}
            <Image
                src={image_url ?? "/placeholder-user.jpg"}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
            />
            {/* Message Bubble */}
            <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                    sender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
            >
                {text}
            </div>
        </div>
    );
};

export default BubbleText;
