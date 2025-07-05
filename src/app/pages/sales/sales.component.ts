import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { OrderService } from '../orders/order.service';
import { Order } from '../../core/models/order.model';
import { OrderStatus, OrderStatusLookup } from '../../core/enums/order-status.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ChartModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  OrderStatus = OrderStatus;
  activeTab: 'pending' | 'report' = 'pending';

  stores = [
    { id: 1, name: 'Acme Store' },
    { id: 2, name: 'Beta Shop' },
    { id: 3, name: 'Gamma Market' }
  ];

  constructor(private orderService: OrderService, private messageService: MessageService) {
    this.orderService.loadOrders().subscribe();
  }

  get orders(): Order[] {
    const allOrders = this.orderService._orders$();
    return this.activeTab === 'pending'
      ? allOrders.filter(o => o.status === OrderStatus.PROCESSING)
      : allOrders.filter(o => o.status === OrderStatus.SOLD);
  }

  get chartData() {
    const soldOrders = this.orderService._orders$().filter(o => o.status === OrderStatus.SOLD);
    const grouped = soldOrders.reduce((acc, order) => {
      acc[order.productName] = acc[order.productName] || { total: 0, count: 0 };
      acc[order.productName].total += order.totalAmount;
      acc[order.productName].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const labels = Object.keys(grouped);
    const totals = labels.map(l => grouped[l].total);
    const counts = labels.map(l => grouped[l].count);

    return {
      bar: {
        labels,
        datasets: [
          {
            label: 'Toplam Satış Tutarı (₺)',
            backgroundColor: '#42A5F5',
            data: totals
          }
        ]
      },
      pie: {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A']
          }
        ]
      }
    };
  }

  chartOptionsBar = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `₺${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: '₺' } },
      x: { title: { display: true, text: 'Ürün' } }
    }
  };

  chartOptionsPie = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value} adet`;
          }
        }
      }
    }
  };

  getStoreName(storeId: number | null | undefined): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.name : '-';
  }

  onApprove(order: Order) {
    const updatedOrder = { ...order, status: OrderStatus.SOLD };
    this.orderService.updateOrder(updatedOrder).subscribe({
      next: res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Satış Onaylandı',
          detail: 'Satış başarıyla tamamlandı!'
        });
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Satış onaylanamadı.'
        });
      },
    });
  }

  onReject(order: Order) {
    const updatedOrder = { ...order, status: OrderStatus.CANCELLED };
    this.orderService.updateOrder(updatedOrder).subscribe();
  }
}