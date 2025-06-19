import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NavbarComponent } from '../../core/shared/navbar/navbar.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ToastModule,
    RouterModule,
    ConfirmDialogModule,
    NavbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {


}