export type Product = {
    product_id: number; // Changed from 'id' to match the database
    brand_id: number; // Added to link the product to a brand
    image_url: string;
    product_name: string; // Changed from 'name' to 'product_name' to match the database
    description: string; // Added based on database schema
    price: number;
    created_at: string; // Matches timestamp format
};

export type Brand = {
    brand_id: number; // Changed from 'id' to match the database
    brand_name: string; // Changed from 'name' to 'brand_name' to match the database
    website?: string;
    industry?: string;
    created_at: string;
};

export type User = {
    user_id: number; // Changed from 'id' to match the database
    username: string; // Changed from 'name' to 'username' to match the database
    email: string;
    profile_bio?: string;
    created_at: string;
    status: string;
};

export type DealData = {
    product: Product;
    brand: Brand;
    brand_rep: BrandRepresentative;
    created_at: string;
    compensation: number;
    deliverables: string;
    deal_id?: number;
    status: string;
};

export type Deal = {
    deal_id: number; // Changed from 'id' to 'deal_id' to match the database
    product_id: number;
    user_id: number;
    rep_id: number; // Added to include the brand representative
    thread_id?: number | null; // Added since deals reference a thread
    status: "pending" | "accepted" | "rejected" | "completed"; // Matches ENUM type in DB
    created_at: string;
    updated_at: string;
    terms: string;
    compensation: number;
};

// Brand Representative Type
export type BrandRepresentative = {
    rep_id: number; // Primary key
    first_name: string;
    last_name: string;
    title: string;
    email: string;
    brand_id: number; // Foreign key to brands table
    status: string; // Active, Inactive, etc.
    created_at: string;
};

// Thread Type
export type Thread = {
    thread_id: number; // Primary key
    subject: string;
    created_at: string;
    updated_at: string;
    status: string; // Active, Archived, etc.
};

// Thread Participant Type
export type ThreadParticipant = {
    thread_id: number; // Foreign key to threads table
    participant_type: "user" | "brand_rep"; // Specifies whether it's a user or brand rep
    participant_id: number; // Can be user_id or rep_id
    joined_at: string;
};

// Message Type
export type Message = {
    message_id: number; // Primary key
    thread_id: number; // Foreign key to threads table
    sender_type: "user" | "brand_rep"; // Indicates who sent the message
    sender_id: number; // Can be user_id or rep_id
    content: string;
    sent_at: string;
    parent_message_id?: number | null; // For reply chains
};
