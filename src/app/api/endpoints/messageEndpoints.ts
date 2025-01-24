import { supabase } from "../clients/supabaseClient";
import { fetchCurrentUser } from "./userEndpoints";

export const fetchThread = async (brand_id: number, user_id: number) => {
    const { data, error } = await supabase
        .from("thread")
        .select("*")
        .eq("brand_id", brand_id)
        .eq("user_id", user_id);

    if (error) {
        console.error("Error fetching brand", error.message);
        return null;
    }

    return data ? data[0] : null;
};

export const fetchMessages = async (brand_id: number, email: string) => {
    const userData = await fetchCurrentUser(email);
    const user_id = userData?.id;

    const thread = await fetchThread(brand_id, user_id);
    const thread_id = thread?.id;

    const { data, error } = await supabase.from("messages").select("*").eq("thread_id", thread_id);

    if (error) {
        console.error("Error fetching brand", error.message);
        return null;
    }

    return data || [];
};
