import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { DealData } from "@/types/types";

export function Deal({ deal }: { deal: DealData }) {
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={`/${deal.product.image_url ?? "placeholder-user.jpg"}`}
                    width="64"
                />
            </TableCell>
            <TableCell className="font-medium">{deal.product.product_name}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {deal.status}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{`$${deal.product.price}`}</TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(deal.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="hidden md:table-cell underline">
                <Link href={`/email/${deal.brand.brand_id}`}>{deal.brand.brand_name}</Link>
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                            {/* <form action={deleteProduct}>
                                <button type="submit">Delete</button>
                            </form> */}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
