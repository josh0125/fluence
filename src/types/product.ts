export type Product = {
    id: number;
    image_url: string;
    name: string;
    status: string;
    price: number;
    available_at: string;
};

export type Brand = {
    id: number;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
};

export type DealData = {
    product: Product;
    brand: Brand;
};

export type Deal = {
    id: number;
    product_id: number;
    brand_id: number;
    user_id: number;
    created_at: Date;
};
