import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';

import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                canActivate: []
            },
            {
                path: 'products',
                component: ProductsComponent,
                canActivate: [permissionGuard]
            },
            {
                path: 'orders',
                component: OrdersComponent,
                canActivate: [permissionGuard]
            },
            {
                path: 'sales',
                component: SalesComponent,
                canActivate: [permissionGuard]
            },
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '**', redirectTo: '' }
        ]
    },


];