import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { Product } from '../../core/models/product.model';
import { OrderService } from '../orders/order.service';
import { ProductsService } from './products.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, OrderModalComponent, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  orderService = inject(OrderService);

  products = signal<Product[]>([]);

  constructor() {
    this.productsService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }

  expensiveProducts = computed(() => this.products().filter(p => p.price > 100));

  visible = signal(false);
  selectedProduct = signal<Product | null>(null);

  openModal(product: Product) {
    this.selectedProduct.set(product);
    this.visible.set(true);
  }

  closeModal() {
    this.visible.set(false);
    this.selectedProduct.set(null);
  }

  onOrderCreated(newOrder: Order) {
    console.log('Sipariş oluşturuldu:', newOrder);
    this.orderService.addOrder(newOrder).subscribe({
      next: () => console.log('Sipariş başarıyla eklendi'),
      error: err => console.error('Sipariş eklenirken hata:', err),
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }
}