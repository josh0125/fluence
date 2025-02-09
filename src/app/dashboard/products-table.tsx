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
// import { SelectProduct } from '@/lib/db';
import { DealData } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal } from "./deal";

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

    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/?offset=${offset}`, { scroll: false });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Deals</CardTitle>
                <CardDescription>Manage your deals and view their status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Deal Total</TableHead>
                            <TableHead className="hidden md:table-cell">Deadline at</TableHead>
                            <TableHead className="hidden md:table-cell">Brand</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deals && deals.map((deal, index) => <Deal key={index} deal={deal} />)}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{" "}
                        <strong>
                            {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-
                            {offset}
                        </strong>{" "}
                        of <strong>{totalProducts}</strong> products
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === productsPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset + productsPerPage > totalProducts}
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}
