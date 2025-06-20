import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserHandlerService } from '../services/user-handler.service';

export const permissionGuard: CanActivateFn = (route, state): boolean | UrlTree => {
    const userSvc = inject(UserHandlerService);
    const router = inject(Router);
    const messageService = inject(MessageService);

    const current = userSvc._currentUser();
    if (!current) {
        messageService.add({
            severity: 'warn',
            summary: 'Erişim Engellendi',
            detail: 'Önce giriş yapmanız gerekiyor.'
        });
        return router.createUrlTree(['/layout']);
    }

    if (current.role === 'manager') {
        return true;
    }

    const url = state.url;
    if (current.role === 'customer') {
        if (url.startsWith('/products')) {
            return true;
        }
    } else if (current.role === 'salesman') {
        if (url.startsWith('/orders')) {
            return true;
        }
    }

    messageService.add({
        severity: 'warn',
        summary: 'Yetki Yetersiz',
        detail: 'Bu sayfaya erişim izniniz yok.'
    });
    return router.createUrlTree(['/layout']);
};