import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface BubbleTextProps {
    text: string;
    sender?: boolean;
    image_url: string | null;
}

const BubbleText: React.FC<BubbleTextProps> = ({ text, sender = false, image_url }) => {
    const [expanded, setExpanded] = useState(false);

    // Split the text into paragraphs
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
    const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 3);

    return (
        <div
            className={`flex items-start gap-2 ${sender ? "flex-row-reverse" : "flex-row"} mb-2`}
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
                <div className="prose">
                    {visibleParagraphs.map((paragraph, index) => (
                        <ReactMarkdown key={index} rehypePlugins={[rehypeRaw]}>
                            {paragraph}
                        </ReactMarkdown>
                    ))}
                </div>
                {/* "Read More" Button */}
                {paragraphs.length > 2 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-500 text-xs mt-2 hover:underline"
                    >
                        {expanded ? "Show Less" : "Read More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BubbleText;
