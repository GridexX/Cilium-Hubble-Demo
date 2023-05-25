export type ProductCatalog = {
    id: string;
    name: string;
    description: string;
    price: number;
};

export type PostProductDto = {
    name: string;
    description: string;
    price: number;
    quantity: number;
};

export type ProductAggregate = PostProductDto & {
    id: string;
};

export type PutProductDto = PostProductDto;

export type ExceptionMessage = {
    code: number;
    message: string;
};

export type OrderStatus =
    | "created"
    | "missing_stock"
    | "confirmed"
    | "paid"
    | "missing_payment"
    | "shipped"
    | "missing_shipping";

export type OrderDto = Order;

type ProductItemDto = {
    product: {
        id: string;
        price: number;
    };
    quantity: number;
};

export type Order = {
    id: number;
    date: Date;
    status: OrderStatus;
    clientName: string;

    productsIncluded: ProductItemDto[];
};
