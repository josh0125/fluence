import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { Brand } from "@/types/types";

export function BrandDropdown({ brands }: { brands: Brand[] }) {
    const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="p-4">
                    {currentBrand ? currentBrand.brand_name : "Brands"}{" "}
                    <ChevronDown className="w-6 h-6 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {brands &&
                    brands.map((brand) => (
                        <Link href={`/email/${brand.brand_id}`} key={brand.brand_id}>
                            <DropdownMenuItem>{brand.brand_name}</DropdownMenuItem>
                        </Link>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
