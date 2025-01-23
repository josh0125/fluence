import { supabase } from "../clients/supabaseClient";
import { Product } from "@/types/product";

export const fetchAllDeals = async (user_id: number) => {
    const { data, error } = await supabase.from("deals").select("*").eq("user_id", user_id);

    const products: Product[] = data
        ? await Promise.all(
              data.map(async (deal) => {
                  const productArray = await fetchProduct(deal.product_id);
                  const brand = await fetchBrand(deal.brand_id);
                  if (productArray && productArray.length > 0) {
                      const product = productArray[0];
                      product.brand = brand;
                      return product;
                  }
                  return null;
              })
          ).then((results) => results.filter((product) => product !== null) as Product[])
        : [];

    if (error) {
        console.error("Error fetching deals", error.message);
        return null;
    }

    return products || [];
};

export const fetchProduct = async (id: number): Promise<Product[] | null> => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id);

    if (error) {
        console.error("Error fetching products", error.message);
        return null;
    }

    return data || [];
};

export const fetchBrand = async (id: number) => {
    const { data, error } = await supabase.from("brands").select("*").eq("id", id);

    if (error) {
        console.error("Error fetching brand", error.message);
        return null;
    }

    return data ? data[0] : null;
};
