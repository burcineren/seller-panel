import { Injectable, computed, signal, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../api/api.module';

export interface User {
  id: number;
  username: string;
  role: 'salesman' | 'manager' | 'customer';
}

@Injectable({ providedIn: 'root' })
export class UserHandlerService {
  protected http: HttpClient;
  protected apiBase: string;

  private _users = signal<User[]>([]);
  readonly users = computed(() => this._users());

  private _currentUser = signal<User | null>(null);
  readonly currentUser = computed(() => this._currentUser());

  constructor(http: HttpClient, @Inject(API_BASE) apiBase: string) {
    this.http = http;
    this.apiBase = apiBase;
    this.loadAll();
  }

  loadAll() {
    this.http.get<User[]>(`${this.apiBase}/users`)
      .subscribe(list => this._users.set(list));
  }

  login(userId: number) {
    const u = this.users().find(x => x.id == userId) || null;
    this._currentUser.set(u);
  }

  logout() {
    this._currentUser.set(null);
  }

  save(input: Partial<User> & { id?: number }) {
    if (input.id) {
      this.http.put<User>(`${this.apiBase}/users/${input.id}`, input)
        .subscribe(u => {
          this._users.update(list =>
            list.map(x => x.id === u.id ? u : x)
          );
          if (this.currentUser()?.id === u.id) {
            this._currentUser.set(u);
          }
        });
    } else {
      this.http.post<User>(`${this.apiBase}/users`, input)
        .subscribe(u => this._users.update(list => [...list, u]));
    }
  }
}