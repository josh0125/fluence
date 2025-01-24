import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { Brand } from "@/types/product";

export async function BrandDropdown({ brands }: { brands: Brand[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="p-4">
                    Brands <ChevronDown className="w-6 h-6 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {brands &&
                    brands.map((brand) => (
                        <DropdownMenuItem key={brand.id}>
                            <Link href={`/email/${brand.id}`}>{brand.name}</Link>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
