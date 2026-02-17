export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string | null;
    image_url: string | null;
};

export type OrderItemOption = {
    name: string;
    value: string;
};

export type OrderItem = {
    product: Product;
    quantity: number;
    options?: OrderItemOption[];
};

export type Order = {
    id: number;
    created_at: string;
    items: OrderItem[];
    total_amount: number;
    status: string;
};
