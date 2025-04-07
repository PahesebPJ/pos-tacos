export interface OrderItem {
    id: number;
    productId: string;
    quantity: number;
}

export default interface Order {
    personId: number;
    personName: string;
    items: OrderItem[];
}