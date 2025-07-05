import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { Order } from '../../core/models/order.model';
import { OrderStatus, OrderStatusLookup } from '../../core/enums/order-status.enum';
import { MessageService } from 'primeng/api';

interface Store {
  id: number;
  name: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent {

  OrderStatus = OrderStatus;
  constructor(private orderService: OrderService, private messageService: MessageService) {
    this.orderService.loadOrders().subscribe();
  }
  stores: Store[] = [
    { id: 1, name: 'Acme Store' },
    { id: 2, name: 'Beta Shop' },
    { id: 3, name: 'Gamma Market' }
  ];
  get orders(): Order[] {
    return this.orderService._orders$().filter(
      o => o.status === OrderStatus.PENDING ||
        o.status === OrderStatus.PROCESSING ||
        o.status === OrderStatus.CANCELLED
    );
  }
  getStatusLabel(status: OrderStatus): string {
    return OrderStatusLookup.find(opt => opt.id === status)?.label ?? status.toString();
  }

  onApprove(order: Order) {
    this.orderService.approveOrder(order).subscribe({
      next: () => this.messageService.add({
        severity: 'success',
        summary: 'Onaya Gönderildi',
        detail: 'Sipariş onaya gönderildi!'
      }),
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'Sipariş onaya gönderilemedi.'
      })
    });
  }

  onReject(order: Order) {
    this.orderService.rejectOrder(order).subscribe({
      next: () => this.messageService.add({
        severity: 'success',
        summary: 'Reddedildi',
        detail: 'Sipariş reddedildi.'
      })
    });
  }

  onStoreChange(order: Order) {
    this.orderService.changeOrderStore(order).subscribe({
      next: () => this.messageService.add({
        severity: 'success',
        summary: 'Mağaza Güncellendi',
        detail: 'Mağaza seçimi kaydedildi.'
      })
    });
  }
  onDelete(order: Order) {
    console.log('Sil tıklandı:', order);
    this.orderService.removeOrder(order.id).subscribe({
      next: () => console.log('Sipariş başarıyla silindi'),
      error: err => console.error('Silme hatası:', err)
    });
  }


}
