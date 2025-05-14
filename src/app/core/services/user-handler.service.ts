import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessageService } from "primeng/api"
interface User {
  id: number;
  email: string;
  pasword: string;
}
@Injectable({ providedIn: 'root' })
export class UserHandlerService {
  http = inject(HttpClient);
  messageService = inject(MessageService);
  login(endpoint: string): Observable<User> {
    return new Observable<User>((observer) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    })

  }
}
