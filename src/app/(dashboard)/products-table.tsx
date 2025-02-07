"use client";

import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DealData } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal } from "./deal";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DealsTable({
    deals,
    offset,
    totalProducts,
}: {
    deals: DealData[] | null;
    offset: number;
    totalProducts: number;
}) {
    const router = useRouter();
    const productsPerPage = 5;

    const [selectedTab, setSelectedTab] = useState("all");

    // Filter deals based on selected tab
    const filteredDeals = deals?.filter((deal) => {
        if (selectedTab === "all") return true;
        if (selectedTab === "accepted") return deal.status.toLowerCase() === "accepted";
        if (selectedTab === "completed") return deal.status.toLowerCase() === "completed";
        if (selectedTab === "pending") return deal.status.toLowerCase() === "pending";
        if (selectedTab === "rejected") return deal.status.toLowerCase() === "rejected";
        if (selectedTab === "archived") return deal.status.toLowerCase() === "archived";
        return false;
    });

    function prevPage() {
        if (offset > productsPerPage) {
            router.push(`/?offset=${offset - productsPerPage}`, { scroll: false });
        }
    }

    function nextPage() {
        if (offset + productsPerPage <= totalProducts) {
            router.push(`/?offset=${offset + productsPerPage}`, { scroll: false });
        }
    }

    return (
        <Card className="shadow-md rounded-xl">
            {/* Table Header Section */}
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Deals</CardTitle>
            </CardHeader>

            {/* Tabs Section Inside DealsTable */}
            <div className="flex items-start justify-start p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="flex space-x-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="accepted">Accepted</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>

                        <TabsTrigger value="archived" className="hidden sm:flex">
                            Archived
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Table Content */}
            <CardContent>
                <Table className="w-full text-sm">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-[250px] hidden sm:table-cell">
                                Company Name
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Brand Representative
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Compensation</TableHead>
                            <TableHead className="hidden md:table-cell">Deliverables</TableHead>
                            <TableHead className="hidden md:table-cell">Deadline</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDeals && filteredDeals.length > 0 ? (
                            filteredDeals.map((deal, index) => <Deal key={index} deal={deal} />)
                        ) : (
                            <TableRow>
                                <TableHead colSpan={6} className="text-center text-gray-500 py-4">
                                    No deals found.
                                </TableHead>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            {/* Pagination Section */}
            <CardFooter className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                    Showing <strong>{Math.min(offset + 1, totalProducts)}</strong> -{" "}
                    <strong>{Math.min(offset + productsPerPage, totalProducts)}</strong> of{" "}
                    <strong>{totalProducts}</strong> deals
                </div>
                <div className="flex gap-2">
                    <Button onClick={prevPage} variant="outline" size="sm" disabled={offset === 0}>
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        onClick={nextPage}
                        variant="outline"
                        size="sm"
                        disabled={offset + productsPerPage >= totalProducts}
                    >
                        Next
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
