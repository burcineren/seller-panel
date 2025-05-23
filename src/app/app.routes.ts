import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';

import { authGuard } from './core/guards/auth.guard';
import { managerGuard } from './core/guards/manager.guard';
import { loginGuard } from './core/guards/login.guard';
import { LoginFormComponent } from './pages/auth/components/login-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    {
        path: 'login',
        component: LoginFormComponent,

    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard, managerGuard]
    },
    { path: '**', redirectTo: '' }
];