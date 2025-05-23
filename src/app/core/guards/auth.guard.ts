import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserHandlerService } from '../services/user-handler.service';

export const authGuard: CanActivateFn = (route, state) => {
    const userSvc = inject(UserHandlerService);
    const router = inject(Router);

    if (userSvc.currentUser()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};