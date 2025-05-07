import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Ürün A', price: 100 },
    { id: 2, name: 'Ürün B', price: 150 },
    { id: 3, name: 'Ürün C', price: 200 },
  ];
}