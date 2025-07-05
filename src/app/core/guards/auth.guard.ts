import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UserHandlerService } from '../services/user-handler.service';

export const authGuard: CanActivateFn = () => {
    const userService = inject(UserHandlerService);
    const router = inject(Router);

    return userService._currentUser()
        ? true
        : (router.parseUrl('/login') as UrlTree);
};