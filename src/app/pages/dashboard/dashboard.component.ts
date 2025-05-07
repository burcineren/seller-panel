import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats = [
    { label: 'Toplam Sipariş', value: 120 },
    { label: 'Bugünkü Gelir', value: '₺3.250' },
    { label: 'Stoktaki Ürün', value: 58 },
    { label: 'Bekleyen Siparişler', value: 6 },
  ];
}