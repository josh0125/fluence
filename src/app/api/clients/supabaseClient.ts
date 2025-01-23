import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey || !supabaseUrl) {
    throw new Error("Supabase key is not defined");
}
export const supabase = createClient(supabaseUrl, supabaseKey);

// // Define the table and types
// export type Product = {
//     id: number;
//     imageUrl: string;
//     name: string;
//     status: "active" | "inactive" | "archived";
//     price: number;
//     stock: number;
//     availableAt: string; // ISO timestamp
// };

// export async function getProducts(
//     search: string,
//     offset: number
// ): Promise<{
//     products: Product[];
//     newOffset: number | null;
//     totalProducts: number;
// }> {
//     if (search) {
//         // Search products by name
//         const { data: products, error } = await supabase.from<Product>;
//         "products".select("*").ilike("name", `%${search}%`).limit(1000);

//         if (error) {
//             console.error("Error fetching products:", error.message);
//             return { products: [], newOffset: null, totalProducts: 0 };
//         }

//         return {
//             products: products || [],
//             newOffset: null,
//             totalProducts: products?.length || 0,
//         };
//     }

//     if (offset === null) {
//         return { products: [], newOffset: null, totalProducts: 0 };
//     }

//     // Fetch total product count
//     const { count: totalProducts, error: countError } = await supabase
//         .from("products")
//         .select("*", { count: "exact", head: true });

//     if (countError) {
//         console.error("Error fetching product count:", countError.message);
//         return { products: [], newOffset: null, totalProducts: 0 };
//     }

//     // Fetch paginated products
//     const { data: products, error: pageError } = await supabase
//         .from<Product>("products")
//         .select("*")
//         .limit(5)
//         .offset(offset);

//     if (pageError) {
//         console.error("Error fetching paginated products:", pageError.message);
//         return { products: [], newOffset: null, totalProducts: 0 };
//     }

//     const newOffset = products && products.length >= 5 ? offset + 5 : null;

//     return {
//         products: products || [],
//         newOffset,
//         totalProducts: totalProducts || 0,
//     };
// }

// export async function deleteProductById(id: number) {
//     const { error } = await supabase.from("products").delete().eq("id", id);

//     if (error) {
//         console.error("Error deleting product:", error.message);
//     }
// }
