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

    const targetUrl = state.url;
    let allowed = false;
    switch (current.role) {
        case 'customer':
            if (targetUrl.startsWith('/products')) {
                allowed = true;
            }
            break;
        case 'salesman':
            if (targetUrl.startsWith('/orders')) {
                allowed = true;
            }
            break;
        case 'manager':
            allowed = true;
            break;
    }

    if (allowed) {
        return true;
    }

    // Rol uygun değilse uyarı göster ve layout’a yönlendir
    messageService.add({
        severity: 'warn',
        summary: 'Yetki Yetersiz',
        detail: 'Bu sayfaya erişim izniniz yok.'
    });
    return router.createUrlTree(['/layout']);
};