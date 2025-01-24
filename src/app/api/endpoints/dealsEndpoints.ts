import { supabase } from "../clients/supabaseClient";
import { Product, Brand, Deal } from "@/types/product";
import { fetchCurrentUser } from "./userEndpoints";

export const fetchAllDeals = async (user_id: number) => {
    const { data, error } = await supabase.from("deals").select("*").eq("user_id", user_id);

    const deals = await Promise.all(
        data?.map(async (deal) => {
            const product = await fetchProduct(deal.product_id);
            const brand = await fetchBrand(deal.brand_id);

            const dealData = {
                product: product,
                brand: brand,
            };
            return dealData;
        }) || []
    );

    if (error) {
        console.error("Error fetching deals", error.message);
        return null;
    }

    return deals || [];
};

export const fetchProduct = async (id: number): Promise<Product | null> => {
    if (!id) return null;
    const { data, error } = await supabase.from("products").select("*").eq("id", id);

    if (error) {
        console.error("Error fetching products", error.message);
        return null;
    }

    return data ? data[0] : null;
};

export const fetchBrand = async (id: number): Promise<Brand | null> => {
    const { data, error } = await supabase.from("brands").select("*").eq("id", id);

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

export const createDeal = async (product: Product, brandId: number, email: string) => {
    const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([product]);

    if (productError) {
        console.error("Error adding product", productError.message);
        return null;
    }

    // Still need to fix this part

    const userData = await fetchCurrentUser(email);

    const deal = { product_id: 1, brand_id: brandId, user_id: userData?.id };

    // const productId = productData ? productData?.id : null;

    const { data: dealData, error: dealError } = await supabase.from("deals").insert(deal);

    console.log("Deal data:", dealData);

    if (dealError) {
        console.error("Error adding deal", dealError.message);
        return null;
    }

    return dealData || [];
};
