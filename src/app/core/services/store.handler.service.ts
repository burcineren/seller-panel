import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../api/api.module';
import { UserHandlerService, User } from './user-handler.service';

export interface Store {
    id: number;
    name: string;
    ownerId: number;
    owner?: User;
}

@Injectable({ providedIn: 'root' })
export class StoreHandlerService {
    private http = inject(HttpClient);
    private apiBase = inject(API_BASE);
    private userSvc = inject(UserHandlerService);

    private _stores = signal<Store[]>([]);
    readonly stores = computed(() => this._stores());

    constructor() {
        this.loadAll();
    }

    loadAll() {
        this.http.get<Store[]>(`${this.apiBase}/stores`)
            .subscribe(list => {
                const users = this.userSvc.users();
                this._stores.set(
                    list.map(s => ({
                        ...s,
                        owner: users.find(u => u.id === s.ownerId)
                    }))
                );
            });
    }

    save(input: Partial<Store> & { id?: number }) {
        if (input.id) {
            this.http.put<Store>(`${this.apiBase}/stores/${input.id}`, input)
                .subscribe(s => {
                    this._stores.update(arr =>
                        arr.map(x => x.id === s.id ? { ...s, owner: x.owner } : x)
                    );
                });
        } else {
            this.http.post<Store>(`${this.apiBase}/stores`, input)
                .subscribe(s => {
                    this._stores.update(stores => [
                        ...stores,
                        { ...s, owner: undefined }
                    ]);
                });
        }
    }
}