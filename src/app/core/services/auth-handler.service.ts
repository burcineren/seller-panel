import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, computed, inject, signal } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { User } from "../models/user.model";
import { GetRequestConfig, RequestHandlerService } from "./request-handler.service";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthHandlerService extends RequestHandlerService {
    router = inject(Router);
    loading = signal(false);
    baseUrl: string = environment.apiBaseUrl;
    isDisabled = computed(() => this.loading());
    _error: WritableSignal<string | null> = signal<string | null>(null);

    _currentUser: WritableSignal<User | null> = signal<User | null>(null);
    constructor() {
        super();
    }
    login(username: string, password: string): Observable<User> {
        return this.post<User>(`users/login`, { username, password }).pipe(
            map((user) => {

                localStorage.setItem('currentUser', JSON.stringify(user));
                this._currentUser.set(user);
                this.router.navigate(['/layout'])
                this.messageService.add({
                    severity: 'success',
                    summary: 'Giriş Başarılı',
                    detail: 'Oturumunuz açıldı.'
                });

                return user;
            }),
            catchError(err => {
                const msg = err.error?.message || 'Giriş sırasında bir hata oluştu.';
                this._error.set(msg);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Giriş Hatası',
                    detail: msg
                });
                return throwError(() => err);
            }),
        )
    }
    logout(): Observable<void> {
        return this.post<void>(`users/logout`, {}).pipe(
            map(() => {
                localStorage.removeItem('currentUser');
                this._currentUser.set(null);
                this.router.navigate(['/login']);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Çıkış Başarılı',
                    detail: 'Oturumunuz kapatıldı.'
                });
            }),
            catchError(err => {
                const msg = err.error?.message || 'Çıkış sırasında bir hata oluştu.';
                this._error.set(msg);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Çıkış Hatası',
                    detail: msg
                });
                return throwError(() => err);
            })
        );
    }
}