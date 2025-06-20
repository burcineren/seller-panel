import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from './products.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { Product } from '../../core/models/product.model';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardModule, ButtonModule, CurrencyPipe, OrderModalComponent, CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private productService = inject(ProductsService);
  products: Product[] = [];
  visible: WritableSignal<boolean> = signal(false);
  selectedProduct: WritableSignal<Product | null> = signal(null);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data as Product[];
      },
      error: (err) => {
        console.error('Ürünler alınırken hata oluştu:', err);
      }
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  openOrderModal(product: Product) {
    this.selectedProduct.set(product);
    this.visible.set(true);
  }

  onModalClose() {
    this.visible.set(false);
    this.selectedProduct.set(null);
  }
}