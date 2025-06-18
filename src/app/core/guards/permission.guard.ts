import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserHandlerService } from '../services/user-handler.service';

export const permissionGuard: CanActivateFn = (route, state) => {
    const userSvc = inject(UserHandlerService);
    const router = inject(Router);

    const current = userSvc._currentUser();

    if (!current) {
        router.navigate(['/layout']);
        return false;
    }

    const targetUrl = state.url;

    switch (current.role) {
        case 'customer':
            if (targetUrl.startsWith('/products')) {
                return true;
            }
            break;

        case 'salesman':
            if (targetUrl.startsWith('/orders')) {
                return true;
            }
            break;

        case 'manager':
            return true;

    }

    router.navigate(['/layout']);
    return false;
};