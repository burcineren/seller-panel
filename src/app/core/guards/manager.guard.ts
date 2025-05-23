import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserHandlerService } from '../services/user-handler.service';

export const managerGuard: CanActivateFn = (route, state) => {
    const userSvc = inject(UserHandlerService);
    const router = inject(Router);
    const current = userSvc.currentUser();

    if (current?.role === 'manager') {
        return true;
    }

    router.navigate(['/dashboard']);
    return false;
};