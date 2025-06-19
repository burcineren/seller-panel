import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AuthHandlerService } from './core/services/auth-handler.service';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenubarModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
