"use client";

import React, { useState } from "react";

interface SendInputProps {
    // onSend: (message: string) => void; // Function to handle sending messages
}

const SendInput: React.FC<SendInputProps> = () => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() !== "") {
            // onSend(message);
            setMessage(""); // Clear the input field after sending
        }
    };

    return (
        <div className="flex items-center gap-2 p-4 border-t border-gray-300">
            {/* Input Field */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {/* Send Button */}
            <button
                onClick={handleSend}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Send
            </button>
        </div>
    );
};

export default SendInput;
