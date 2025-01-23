"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./products-table";
import { fetchAllDeals } from "../api/endpoints/dealsEndpoints";
import { fetchAllProducts } from "../api/endpoints/fetchProducts";
import { createNewUser, fetchCurrentUser } from "../api/endpoints/userEndpoints";
import { Product } from "@/types/product";

export default function ProductsPage() {
    const [deals, setDeals] = useState<Product[]>([]);

    const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const data = await fetchAllProducts();
    //         if (data) setDeals(data);
    //     };

    //     fetchProducts();
    // }, []);

    const handleUserAndFetchProducts = async (email: string, name: string) => {
        try {
            const userData = await fetchCurrentUser(email);
            let userId = userData?.id;

            if (!userId) {
                userId = await createNewUser(name, email);
            }

            if (userId) {
                // const data = await fetchAllProducts();
                // setProducts(data || []);

                const deals = await fetchAllDeals(userId);
                setDeals(deals || []);
            }
        } catch (error) {
            console.error("Error handling user or fetching products:", error);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const name = session.user.name || "Unknown";
            const email = session.user.email || "";

            if (email) {
                handleUserAndFetchProducts(email, name);
            }
        }
    }, [status, session]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Product
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <ProductsTable products={deals} offset={0} totalProducts={deals.length} />
            </TabsContent>
        </Tabs>
    );
}
