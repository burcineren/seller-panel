import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { API_BASE } from '../../core/api/api.module';
import { User, UserHandlerService } from '../../core/services/user-handler.service';

export interface LoginResponse {
    user: User;
}

@Injectable({ providedIn: 'root' })
export class LoginService extends UserHandlerService {
    constructor(http: HttpClient, @Inject(API_BASE) apiBase: string) {
        super(http, apiBase);
    }

    loginWithCredentials(
        username: string,
        password: string
    ): Observable<User> {
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http
            .get<User[]>(`${this.apiBase}/users`, { params })
            .pipe(
                map(users => {
                    if (users.length === 0) {
                        throw new Error('Geçersiz kullanıcı adı veya şifre');
                    }
                    return users[0];
                }),
                tap(user => {
                    super.login(user.id);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                })
            );
    }
}