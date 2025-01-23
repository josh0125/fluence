export type Product = {
    id: number;
    image_url: string;
    name: string;
    status: string;
    price: number;
    availableAt: Date;
    brand_id: number;
    brand: Brand;
};

export type Brand = {
    id: number;
    name: string;
};
