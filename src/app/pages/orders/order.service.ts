import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Order } from '../../core/models/order.model';
import { RequestHandlerService } from '../../core/services/request-handler.service';
import { mapTo } from 'rxjs/operators';
import { OrderStatus } from '../../core/enums/order-status.enum';
@Injectable({ providedIn: 'root' })
export class OrderService extends RequestHandlerService {
    _orders$ = signal<Order[]>([]);

    ordersPath = "orders";

    loadOrders(): Observable<Order[]> {
        return this.get<Order[]>({ url: this.ordersPath }).pipe(
            tap(orders => this._orders$.set(orders)),
            catchError(error => {
                console.error('Siparişler yüklenirken hata:', error);
                this._orders$.set([]);
                return of([]);
            })
        );
    }

    addOrder(newOrder: Order): Observable<Order> {
        this._orders$.update(orders => [...orders, newOrder]);

        return this.post<Order>(this.ordersPath, newOrder).pipe(
            tap(created => this._orders$.update(orders =>
                orders.map(o => o.id === newOrder.id ? created : o))),
            catchError(err => {
                console.error('Sipariş ekleme hatası:', err);
                return of(newOrder);
            })
        );
    }

    updateOrder(order: Order): Observable<Order> {
        this._orders$.update(orders => orders.map(o => o.id === order.id ? order : o));

        return this.put<Order>(`${this.ordersPath}/${order.id}`, order).pipe(
            tap(updated => this._orders$.update(orders =>
                orders.map(o => o.id === updated.id ? updated : o))),
            catchError(err => {
                console.error('Sipariş güncelleme hatası:', err);
                return of(order);
            })
        );
    }



    removeOrder(orderId: number): Observable<any> {
        this._orders$.update(orders => orders.filter(o => o.id !== orderId));

        return this.delete(`${this.ordersPath}/${orderId}`).pipe(
            tap(() => console.log('Sipariş silindi:', orderId)),
            mapTo(void 0),
            catchError(err => {
                console.error('Silme hatası:', err);
                return of(void 0);
            })
        );
    }
    approveOrder(order: Order): Observable<Order> {
        const updatedOrder = { ...order, status: OrderStatus.PROCESSING };
        return this.updateOrder(updatedOrder).pipe(
            tap(() => console.log(`Sipariş onaya gönderildi: ${order.id}`)),
            catchError(err => {
                console.error('Onaya gönderme hatası:', err);
                return of(order);
            })
        );
    }

    rejectOrder(order: Order): Observable<Order> {
        const updatedOrder = { ...order, status: OrderStatus.CANCELLED };
        return this.updateOrder(updatedOrder).pipe(
            tap(() => console.log(`Sipariş reddedildi: ${order.id}`)),
            catchError(err => {
                console.error('Reddetme hatası:', err);
                return of(order);
            })
        );
    }

    changeOrderStore(order: Order): Observable<Order> {
        return this.updateOrder(order).pipe(
            tap(() => console.log(`Mağaza güncellendi: ${order.id}`)),
            catchError(err => {
                console.error('Mağaza güncelleme hatası:', err);
                return of(order);
            })
        );
    }
}