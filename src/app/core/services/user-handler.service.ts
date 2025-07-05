import { Injectable, computed, signal, Inject, inject } from '@angular/core';
import { User } from '../models/user.model';
import { RequestHandlerService, GetRequestConfig } from './request-handler.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class UserHandlerService extends RequestHandlerService {
  _users = signal<User[]>([]);
  _currentUser = signal<User | null>(null);
  private _loadingUsers = signal<boolean>(false);
  readonly loadingUsers = this._loadingUsers.asReadonly();

  private _usersError = signal<string | null>(null);
  readonly usersError = this._usersError.asReadonly();

  constructor() {
    super();
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      try {
        const user: User = JSON.parse(raw);
        this._currentUser.set(user);
      } catch { }
    }
  }



  getAllUsers(): void {
    this._loadingUsers.set(true);
    this._usersError.set(null);

    const config: GetRequestConfig = {
      url: 'users',
    };

    this.get<User[]>(config).subscribe({
      next: (users) => {
        this._users.set(users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this._usersError.set('Kullanıcılar yüklenemedi');
      },
      complete: () => {
        this._loadingUsers.set(false);
      }
    });
  }



  //requestler bu servisten yönetilcek Post işeminde confirmation 
  // parametreye bağlı olarak gösterilecek, delete de confirmation alacak, 
  // bütün request hataları bu servis üzerinde handler edilecek 

}