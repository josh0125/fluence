import { supabase } from "@/app/api/clients/supabaseClient";

export const createNewUser = async (username: string, email: string) => {
    try {
        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    username: username, // Changed 'name' to 'username' to match the database schema
                    email: email,
                },
            ])
            .select("user_id") // Changed 'id' to 'user_id' to match schema
            .single();

        if (insertError) {
            console.error("Error inserting user:", insertError?.message);
            return;
        }

        return newUser?.user_id; // Return the correct user_id
    } catch (error) {
        console.error("Error inserting user:", error);
    }
};

export const fetchCurrentUser = async (email: string | undefined | null) => {
    if (!email) return;

    try {
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("user_id, username, email") // Changed 'id' to 'user_id' and 'name' to 'username'
            .eq("email", email)
            .single();

        if (userError) {
            console.error("Error fetching current user:", userError.message);
            return;
        }

        return userData;
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
};
