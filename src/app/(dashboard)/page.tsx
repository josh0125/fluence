"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DealsTable } from "./products-table";
import { fetchAllDeals, createDeal } from "../api/endpoints/dealsEndpoints";
import { createNewUser, fetchCurrentUser } from "../api/endpoints/userEndpoints";
import { DealData, Product } from "@/types/types";
import { AddDealModal } from "./addDealModal";

export default function ProductsPage() {
    const [deals, setDeals] = useState<DealData[]>([]);
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const data = await fetchAllProducts();
    //         if (data) setDeals(data);
    //     };

    //     fetchProducts();
    // }, []);

    const handleUserAndFetchDeals = async (email: string, name: string) => {
        try {
            const userData = await fetchCurrentUser(email);
            let userId = userData?.user_id;

            if (!userId) {
                userId = await createNewUser(name, email);
            }

            if (userId) {
                const dealsData = await fetchAllDeals(userId);
                const validDeals = dealsData
                    ?.filter((deal) => deal.product !== null && deal.brand !== null)
                    .map((deal) => ({
                        ...deal,
                        created_at: deal.created_date || new Date().toISOString(),
                    })) as DealData[]; // Type assertion ensures non-nullability

                setDeals(validDeals);
            }
        } catch (error) {
            console.error("Error handling user or fetching products:", error);
        }
    };

    const addDealModal = () => {
        setIsModalOpen(true);
    };

    const handleAddDeal = async (product: Product, brandId: number) => {
        try {
            const data = await createDeal(product, brandId, email);
            // setDeals(data || []);
        } catch (error) {
            console.error("Error adding deal:", error);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const name = session.user.name || "Unknown";
            const email = session.user.email || "";

            if (email) {
                setEmail(email);
                handleUserAndFetchDeals(email, name);
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
                {/* <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList> */}
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1" onClick={() => addDealModal()}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Product
                        </span>
                    </Button>
                    <AddDealModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddDeal}
                    />
                </div>
            </div>
            <TabsContent value="all">
                <DealsTable deals={deals} offset={0} totalProducts={deals.length} />
            </TabsContent>
        </Tabs>
    );
}
