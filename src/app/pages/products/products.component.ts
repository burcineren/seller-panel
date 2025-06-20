import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from './products.service';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardModule, ButtonModule, CurrencyPipe, CommonModule, Dialog, ButtonModule, InputTextModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productService = inject(ProductsService);
  products: any = [];
  visible: boolean = false;



  constructor() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Ürünler alındı::::', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Ürünler alınırken hata oluştu:', err);
      }
    })
  }
  showDialog() {
    this.visible = true;
  }
}