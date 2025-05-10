import { Injectable } from '@angular/core';
import { AuthHandlerService } from '../../core/services/auth-handler.service';
import { Observable } from 'rxjs';

interface User {
    email: string;
    password: string;
}
@Injectable({
    providedIn: 'root'
})
export class LoginService extends AuthHandlerService {
    private readonly USER: User = {
        email: 'burcin@gmail.com',
        password: '12345',
    };


    login(email: string, password: string): Observable<boolean> {
        return new Observable<boolean>(observer => {
            const isValid =
                email === this.USER.email &&
                password === this.USER.password;

            if (isValid) {

                const mockToken = 'dummy-auth-token';

                this.setToken(mockToken);

                observer.next(true);
            } else {
                observer.next(false);
            }
            observer.complete();
        });
    }

    logout(): void {
        this.clearToken();
    }

}