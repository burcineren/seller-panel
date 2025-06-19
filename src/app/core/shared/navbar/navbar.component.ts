import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { AuthHandlerService } from '../../services/auth-handler.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule,
    CommonModule,
    ButtonModule,
    CardModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
  authHandlerService = inject(AuthHandlerService);
  rightItems: MenuItem[] = [
    {
      label: 'Ürünler',
      icon: 'pi pi-fw pi-tags',
      command: () => {
        this.router.navigate(['/products']);
      }
    },
    {
      label: 'Siparişler',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => {
        this.router.navigate(['/orders']);
      }
    },
    {
      label: 'Satışlar',
      icon: 'pi pi-fw pi-chart-line',
      command: () => {
        this.router.navigate(['/sales']);
      }
    }
  ];
  onLogout() {
    this.authHandlerService.logout().subscribe({})
  }
}
