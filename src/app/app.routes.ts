import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
];
