import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginService } from '../auth/login.service';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuItem } from 'primeng/api';
import { AuthHandlerService } from '../../core/services/auth-handler.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MenubarModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RouterModule,
    ConfirmDialogModule,],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
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


  // onLogout() {
  //   this.loginService.logout().subscribe({
  //     next: () => {
  //       this.router.navigate(['/login']);
  //     },
  //     complete: () => {
  //       localStorage.removeItem('currentUser');
  //       console.log('Çıkış başarılı!');
  //     }
  //   });
  // }
  onLogout() {
    this.authHandlerService.logout().subscribe({})
  }
}