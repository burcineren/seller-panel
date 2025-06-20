import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

interface Order {
  id: number;
  productName: string;
  status: 'new' | 'approved' | 'rejected';
  customerName: string;
  orderDate: string;
  totalAmount: number;
  address: string;
  productStock: number;
  selectedStoreId?: number | null;
}

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
  stores: Store[] = [
    { id: 1, name: 'Acme Store' },
    { id: 2, name: 'Beta Shop' },
    { id: 3, name: 'Gamma Market' }
  ];

  orders: Order[] = [
    {
      id: 1,
      productName: 'Acme Widget',
      status: 'new',
      customerName: 'Ali Veli',
      orderDate: new Date().toISOString(),
      totalAmount: 19.99,
      address: 'İstanbul, Türkiye',
      productStock: 150,
      selectedStoreId: null
    },
    {
      id: 2,
      productName: 'Beta Gadget',
      status: 'new',
      customerName: 'Ayşe Yılmaz',
      orderDate: new Date().toISOString(),
      totalAmount: 29.5,
      address: 'Ankara, Türkiye',
      productStock: 0,
      selectedStoreId: null
    },
    {
      id: 3,
      productName: 'Gamma Gizmo',
      status: 'approved',
      customerName: 'Mehmet Can',
      orderDate: new Date().toISOString(),
      totalAmount: 45.0,
      address: 'İzmir, Türkiye',
      productStock: 20,
      selectedStoreId: 2
    },
    {
      id: 4,
      productName: 'Delta Device',
      status: 'rejected',
      customerName: 'Fatma Kara',
      orderDate: new Date().toISOString(),
      totalAmount: 55.75,
      address: 'Bursa, Türkiye',
      productStock: 5,
      selectedStoreId: null
    }
  ];
  trackById(index: number, item: Order) {
    return item.id;
  }

  onApprove(order: Order) {
    console.log('Onaya Gönder tıklandı:', order);
    if (order.productStock > 0 && order.selectedStoreId) {
      order.status = 'approved';
    }
  }

  onReject(order: Order) {
    console.log('Reddet tıklandı:', order);
    order.status = 'rejected';
  }

  onDelete(order: Order) {
    console.log('Sil tıklandı:', order);
    this.orders = this.orders.filter(o => o.id !== order.id);
  }

}
