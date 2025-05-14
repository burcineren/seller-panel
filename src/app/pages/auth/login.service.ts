import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserHandlerService } from '../../core/services/user-handler.service';

interface User {
    email: string;
    password: string;
}
@Injectable({
    providedIn: 'root'
})
export class LoginService extends UserHandlerService {
    apiUrl = 'http://localhost:3000/users';
    email = "test@test.com"
    pass = "111"
    loginUser() {
        this.login(this.apiUrl).subscribe((isLoggedIn) => {

            if (isLoggedIn) {
                console.log('Login successful:::');
                // You can also set the token here if needed
                localStorage.getItem('');
                // this.setToken(token);
            } else {
                console.log('Login failed');
            }
        });
    }

    // logout(): void {
    //     this.clearToken();
    // }

}