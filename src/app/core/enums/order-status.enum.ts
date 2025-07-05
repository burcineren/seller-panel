import { IdLabelPair } from "../models/id-label-pair";

export enum OrderStatus {
    PENDING = 1,
    PROCESSING = 2,
    SOLD = 3,
    CANCELLED = 4,
    REFUNDED = 5
}
export const OrderStatusLookup: IdLabelPair<OrderStatus>[] = [
    { id: OrderStatus.PENDING, label: 'Beklemede' },
    { id: OrderStatus.PROCESSING, label: 'İşleniyor' },
    { id: OrderStatus.SOLD, label: 'Satıldı' },
    { id: OrderStatus.CANCELLED, label: 'İptal Edildi' },
    { id: OrderStatus.REFUNDED, label: 'İade Edildi' }
];