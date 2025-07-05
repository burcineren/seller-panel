import { OrderStatus } from "../enums/order-status.enum";

export type Order = {
    id: number;
    productId: number;
    productName: string;
    status: OrderStatus;
    customerId?: number;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    address: string;
    storeId?: number;
    selectedStoreId?: number | null;
    productStock: number;
};