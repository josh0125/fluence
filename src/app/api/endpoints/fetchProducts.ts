import { supabase } from "../clients/supabaseClient";
import { Product } from "@/types/product";

export const fetchAllProducts = async (): Promise<Product[] | null> => {
    const { data, error } = await supabase.from("products").select("*");

    console.log("Data", data);

    if (error) {
        console.error("Error fetching products", error.message);
        return null;
    }

    return data || [];
};

export const fetchBrand = async (id: number) => {
    const { data, error } = await supabase.from("brands").select("*").eq("id", id);

    console.log("Brand", data);

    if (error) {
        console.error("Error fetching brand", error.message);
        return null;
    }

    return data ? data[0] : null;
};

export const fetchAllBrands = async () => {
    const { data, error } = await supabase.from("brands").select("*");

    if (error) {
        console.error("Error fetching brands", error.message);
        return null;
    }

    return data || [];
};
