import { supabase } from "../clients/supabaseClient";
import { fetchCurrentUser } from "./userEndpoints";
import { BrandRepresentative, Thread, Message } from "@/types/types"; // Adjust path if needed

export const fetchThread = async (brand_id: number, user_id: number): Promise<Thread | null> => {
    // Find the brand representative for the given brand_id
    const { data: repData, error: repError } = await supabase
        .from("brand_representatives")
        .select("rep_id")
        .eq("brand_id", brand_id)
        .limit(1)
        .single();

    if (repError || !repData) {
        console.error(
            "Error fetching brand representative:",
            repError?.message || "No representative found"
        );
        return null;
    }

    const rep_id: number = repData.rep_id;

    // Fetch all thread_ids where the user is a participant
    const { data: userThreadData, error: userThreadError } = await supabase
        .from("thread_participants")
        .select("thread_id")
        .eq("participant_type", "user")
        .eq("participant_id", user_id);

    if (userThreadError || !userThreadData) {
        console.error(
            "Error fetching user threads:",
            userThreadError?.message || "No threads found"
        );
        return null;
    }

    // Fetch all thread_ids where the brand representative is a participant
    const { data: repThreadData, error: repThreadError } = await supabase
        .from("thread_participants")
        .select("thread_id")
        .eq("participant_type", "brand_rep")
        .eq("participant_id", rep_id);

    if (repThreadError || !repThreadData) {
        console.error("Error fetching rep threads:", repThreadError?.message || "No threads found");
        return null;
    }

    // Extract thread IDs from the result sets
    const userThreadIds = userThreadData.map((thread) => thread.thread_id);
    const repThreadIds = repThreadData.map((thread) => thread.thread_id);

    // Find the common thread between the user and the brand representative
    const commonThreadIds = userThreadIds.filter((id) => repThreadIds.includes(id));

    if (commonThreadIds.length === 0) {
        console.error("No common thread found between user and brand representative");
        return null;
    }

    // Fetch the actual thread data
    const { data: threadData, error: threadError } = await supabase
        .from("threads")
        .select("*")
        .eq("status", "active")
        .in("thread_id", commonThreadIds)
        .limit(1)
        .single();

    if (threadError || !threadData) {
        console.error("Error fetching thread:", threadError?.message || "No thread found");
        return null;
    }

    return threadData as Thread;
};

export const fetchMessages = async (brand_id: number, email: string): Promise<Message[] | null> => {
    const userData = await fetchCurrentUser(email);
    const user_id = userData?.user_id; // Ensuring correct column name

    if (!user_id) {
        console.error("User not found");
        return null;
    }

    // Fetch the thread between the user and the brand representative
    const thread = await fetchThread(brand_id, user_id);
    const thread_id = thread?.thread_id; // Ensuring correct column name

    if (!thread_id) {
        console.error("No thread found for user and brand");
        return [];
    }

    // Fetch messages in the thread
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("thread_id", thread_id)
        .order("sent_at", { ascending: true });

    if (error) {
        console.error("Error fetching messages:", error.message);
        return null;
    }

    return data as Message[]; // Ensure type safety
};
