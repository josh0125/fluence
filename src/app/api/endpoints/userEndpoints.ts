import { supabase } from "@/app/api/clients/supabaseClient";

export const createNewUser = async (name: string, email: string) => {
    try {
        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    name: name,
                    email: email,
                },
            ])
            .select("id")
            .single();
        if (insertError) {
            console.error("Error inserting user:", insertError.message);
            return;
        }
        console.log("User added to the table successfully!");
        const userId = newUser.id;
        return userId;
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
};

export const fetchCurrentUser = async (email: string | undefined | null) => {
    if (!email) return;

    try {
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, name, email")
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
