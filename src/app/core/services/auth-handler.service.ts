import { Injectable, Signal, WritableSignal, computed, signal } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthHandlerService {
    _authToken: WritableSignal<string | null>;

    authToken: Signal<string | null>;

    isAuthenticated: Signal<boolean>;

    constructor() {
        const saved = localStorage.getItem('authToken');
        this._authToken = signal<string | null>(saved);
        this.authToken = computed(() => this._authToken());
        this.isAuthenticated = computed(() => !!this._authToken());
    }

    setToken(token: string): void {
        localStorage.setItem('authToken', token);
        this._authToken.set(token);
    }

    clearToken(): void {
        localStorage.removeItem('authToken');
        this._authToken.set(null);
    }
}