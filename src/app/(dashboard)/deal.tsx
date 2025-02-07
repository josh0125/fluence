import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { DealData } from "@/types/types";

// Define status colors
const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-600 px-2 py-1 rounded-full",
    accepted: "bg-green-100 text-green-600 px-2 py-1 rounded-full",
    pending: "bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full",
    rejected: "bg-orange-100 text-orange-600 px-2 py-1 rounded-full",
    completed: "bg-gray-100 text-gray-600 px-2 py-1 rounded-full",
    archived: "bg-purple-100 text-purple-600 px-2 py-1 rounded-full",
};

const statusDotColors: Record<string, string> = {
    new: "bg-blue-600",
    accepted: "bg-green-600",
    pending: "bg-yellow-600",
    rejected: "bg-orange-600",
    completed: "bg-gray-600",
    archived: "bg-purple-600",
};

// Available status options
const statusOptions = ["New", "Accepted", "Pending", "Rejected", "Completed", "Archived"];

export function Deal({ deal }: { deal: DealData }) {
    const [currentStatus, setCurrentStatus] = useState(deal.status);

    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <TableRow className="border-b hover:bg-gray-50 transition">
            <TableCell className="hidden md:table-cell font-medium">
                {deal.brand.brand_name}
            </TableCell>
            {/* Brand Rep with Image */}
            <TableCell className="flex items-center gap-3">
                <Image
                    alt="Brand rep"
                    height={40}
                    width={40}
                    className="rounded-full object-cover w-10 h-10"
                    src={`/${deal.product.image_url ?? "default_profile.jpg"}`}
                />
                <div>
                    <p className="font-semibold">
                        {deal.brand_rep.first_name} {deal.brand_rep.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {" "}
                        {deal.brand_rep.title ? deal.brand_rep.title : "Brand Manager"}
                    </p>
                </div>
            </TableCell>

            {/* Status with Dropdown */}
            <TableCell>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent focus:bg-transparent"
                        >
                            <Badge className={`${statusColors[deal.status.toLowerCase()]}`}>
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        statusDotColors[deal.status.toLowerCase()]
                                    }`}
                                />
                                <span className="pl-2">
                                    {deal.status.charAt(0).toUpperCase() +
                                        deal.status.slice(1).toLowerCase()}
                                </span>
                            </Badge>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 bg-white shadow-lg rounded-md border">
                        {statusOptions.map((status) => (
                            <Button
                                key={status}
                                variant="ghost"
                                className="w-full px-2 py-1 flex items-center gap-2 hover:bg-transparent focus:bg-transparent active:bg-transparent"
                                onClick={() => setCurrentStatus(status.toLowerCase())}
                            >
                                <Badge className={`${statusColors[status.toLowerCase()]}`}>
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            statusDotColors[status.toLowerCase()]
                                        }`}
                                    />
                                    <span className="pl-2">
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1).toLowerCase()}
                                    </span>
                                </Badge>
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
            </TableCell>

            {/* Compensation */}
            <TableCell className="hidden md:table-cell font-medium">
                {deal.compensation ? `$${deal.compensation}` : "$0"}
            </TableCell>

            {/* Deliverables */}
            <TableCell className="hidden md:table-cell text-gray-500 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span>
                    {isExpanded
                        ? deal.deliverables
                        : deal.deliverables.length > 20
                        ? `${deal.deliverables.slice(0, 20)}`
                        : deal.deliverables}
                </span>
                {deal.deliverables.length > 20 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-gray-600"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Less" : <MoreHorizontal className="h-4 w-4" />}
                    </Button>
                )}
            </TableCell>
            <TableCell className="hidden md:table-cell underline">
                <Link href={`/email/${deal.brand.brand_id}`}>{deal.brand.brand_name}</Link>
            </TableCell>

            {/* Actions Dropdown */}
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/deal/edit/${deal.brand.brand_id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 hover:bg-red-100">
                            Archive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
