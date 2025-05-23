import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RedirectService {
    private _url = signal<string>('/dashboard');
    readonly url = this._url.asReadonly();

    setUrl(path: string) {
        this._url.set(path);
    }
}