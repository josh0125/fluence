import { supabase } from "../clients/supabaseClient";
import { Product, Brand, Deal } from "@/types/types";
import { fetchCurrentUser } from "./userEndpoints";

export const fetchAllDeals = async (user_id: number) => {
    const { data, error } = await supabase
        .from("deals")
        .select("*, products(*, brands(*)), brand_representatives(*)")
        .eq("user_id", user_id);

    if (error) {
        console.error("Error fetching deals", error.message);
        return null;
    }

    const deals =
        data?.map((deal) => ({
            product: deal.products,
            brand: deal.products?.brands,
            brand_rep: deal.brand_representatives,
            created_date: deal.created_at,
            deal_id: deal.deal_id,
            status: deal.status,
            compensation: deal.compensation,
            deliverables: deal.terms,
        })) || [];

    return deals;
};

export const fetchProduct = async (product_id: number): Promise<Product | null> => {
    if (!product_id) return null;
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", product_id);

    if (error) {
        console.error("Error fetching product", error.message);
        return null;
    }

    return data?.[0] || null;
};

export const fetchBrand = async (brand_id: number): Promise<Brand | null> => {
    if (!brand_id) return null;
    const { data, error } = await supabase.from("brands").select("*").eq("brand_id", brand_id);

    if (error) {
        console.error("Error fetching brand", error.message);
        return null;
    }

    return data?.[0] || null;
};

export const fetchAllBrands = async () => {
    const { data, error } = await supabase.from("brands").select("*");

    if (error) {
        console.error("Error fetching brands", error.message);
        return null;
    }

    return data || [];
};

export const createDeal = async (product: Product, brandId: number, email: string) => {
    // Insert product
    const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([product])
        .select("*")
        .single(); // Ensures we get the inserted row

    if (productError) {
        console.error("Error adding product", productError.message);
        return null;
    }

    // Fetch the current user
    const userData = await fetchCurrentUser(email);
    if (!userData) {
        console.error("Error: User not found");
        return null;
    }

    // Fetch the brand representative
    const { data: brandRepData, error: brandRepError } = await supabase
        .from("brand_representatives")
        .select("*")
        .eq("brand_id", brandId)
        .limit(1)
        .single(); // Get one representative

    if (brandRepError) {
        console.error("Error fetching brand representative", brandRepError.message);
        return null;
    }

    // Insert deal
    const deal = {
        product_id: productData.product_id,
        user_id: userData.user_id,
        rep_id: brandRepData.rep_id,
        thread_id: null, // A thread should be created before assigning this
        status: "pending", // Default status
        terms: "Standard deal terms",
        compensation: 0.0, // Default compensation
    };

    const { data: dealData, error: dealError } = await supabase
        .from("deals")
        .insert([deal])
        .select("*")
        .single();

    if (dealError) {
        console.error("Error adding deal", dealError.message);
        return null;
    }

    return dealData;
};
