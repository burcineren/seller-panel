import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { layoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';

import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { SalesComponent } from './pages/sales/sales.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: 'layout',
        component: layoutComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard, permissionGuard]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard, permissionGuard]
    },
    {
        path: 'sales',
        component: SalesComponent,
        canActivate: [authGuard, permissionGuard]
    },
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: '**', redirectTo: 'layout' }
];