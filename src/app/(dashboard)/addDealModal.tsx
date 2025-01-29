import React, { useEffect, useState } from "react";
import { Brand, Product } from "@/types/types";
import { fetchAllBrands } from "@/app/api/endpoints/dealsEndpoints";

type AddDealModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Product, brandId: number) => void;
};

export function AddDealModal({ isOpen, onClose, onSubmit }: AddDealModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("Active");
    const [availableAt, setAvailableAt] = useState(new Date().toISOString().split("T")[0]); // Default to today
    const [brandId, setBrandId] = useState<number | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const allBrands = await fetchAllBrands();
            setBrands(allBrands || []);
            if (allBrands && allBrands.length > 0) setBrandId(allBrands[0].id); // Default to the first brand
        };

        fetchBrands();
    }, []);

    const handleSubmit = () => {
        if (brandId === null) {
            alert("Please select a brand.");
            return;
        }

        const newProduct: Product = {
            product_id: Math.floor(Math.random() * 100000), // Generate a temporary ID
            image_url: "https://via.placeholder.com/150", // Placeholder for now
            product_name: name,
            price,
            brand_id: brandId,
            description: "",
            created_at: new Date().toISOString(),
        };

        const brand = brands.find((b) => b.brand_id === brandId);

        if (brand) {
            onSubmit(newProduct, brand.brand_id);
        } else {
            alert("Selected brand not found.");
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Add a New Deal</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-md p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="w-full border rounded-md p-2"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Available At</label>
                        <input
                            type="date"
                            className="w-full border rounded-md p-2"
                            value={availableAt}
                            onChange={(e) => setAvailableAt(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Brand</label>
                        <select
                            className="w-full border rounded-md p-2"
                            value={brandId || ""}
                            onChange={(e) => setBrandId(Number(e.target.value))}
                        >
                            {brands.map((brand) => (
                                <option key={brand.brand_id} value={brand.brand_id}>
                                    {brand.brand_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={handleSubmit}
                        >
                            Add Deal
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
