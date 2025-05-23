import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserHandlerService } from '../services/user-handler.service';
import { RedirectService } from '../services/redirect.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const userSvc = inject(UserHandlerService);
    const router = inject(Router);
    const redirectSvc = inject(RedirectService);

    if (userSvc.currentUser()) {
        const target = redirectSvc.url() ?? '/dashboard';
        redirectSvc.setUrl('/dashboard');
        router.navigateByUrl(target);
        return false;
    }

    return true;
};