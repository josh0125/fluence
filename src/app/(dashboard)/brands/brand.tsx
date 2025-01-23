import { Button } from "@/components/ui/button";
import { fetchAllBrands } from "@/app/api/endpoints/fetchProducts";
// import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export async function Brand() {
    const brands = await fetchAllBrands();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="p-4">
                    Brands
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {brands &&
                    brands.map((brand) => (
                        <DropdownMenuItem key={brand.id}>
                            <Link href={`/brands/${brand.id}`}>{brand.name}</Link>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
