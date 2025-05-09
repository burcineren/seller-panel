import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoginHandlerService {
    constructor() { }

    login(email: string, password: string) {

        localStorage.setItem('token', 'your_token_here');
    }
}