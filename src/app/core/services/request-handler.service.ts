import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscribable, Subscriber, catchError, of } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "../../../environments/environment";

export type GetRequestConfig = {
    url: string;
    successMessage?: string;
    params?: HttpParams;
}
@Injectable({ providedIn: 'root' })
export class RequestHandlerService {
    confirmationService = inject(ConfirmationService);
    http = inject(HttpClient);
    messageService = inject(MessageService);
    apiBase: string = environment.apiBaseUrl;

    get<T>(config: GetRequestConfig): Observable<T> {
        const fullUrl = `${this.apiBase}/${config.url}`;

        const subscriber = config.params ? this.http.get<T>(fullUrl, { ...config.params }) : this.http.get<T>(fullUrl);
        return new Observable((observer) => {
            subscriber.subscribe({
                next: (data: T) => {
                    observer.next(data);
                    if (config.successMessage) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Başarılı',
                            detail: config.successMessage
                        });
                    }
                    observer.complete();
                },
                error: (err) => {
                    observer.error(err);
                },
                complete: () => {
                    observer.complete();
                }
            })

        })
    }
    delete<T>(url: string): Observable<T> {
        return new Observable((observer) => {
            const fullUrl = `${this.apiBase}/${url}`;
            this.confirmationService.confirm({
                message: 'Bu işlemi onaylıyor musunuz?',
                header: "Sil",
                icon: 'pi pi-exclamation-triangle',
                rejectButtonProps: {
                    label: 'İptal',
                    outlined: true,
                    severity: 'secondary'
                },
                acceptButtonProps: {
                    label: 'Sil',
                    severity: 'danger',
                },
                accept: () => {
                    this.http.delete<T>(fullUrl).subscribe({
                        next: (data: T) => {
                            observer.next(data);
                            observer.complete();
                        },
                        error: (err) => {
                            observer.error(err);
                        },
                        complete: () => {
                            observer.complete();
                        }
                    });
                },
                reject: () => {
                    observer.complete();
                }
            })
        })
    }
    post<T>(url: string, body: any, comfirmationRequired?: boolean): Observable<T> {
        return new Observable((observer) => {
            const fullUrl = `${this.apiBase}/${url}`;
            if (comfirmationRequired) {
                this.postWithConfirmation<T>(fullUrl, body, observer)
            }
            else {
                this.postWithoutConfirmation<T>(fullUrl, body, observer);
            }
        });
    }
    protected postWithConfirmation<T>(url: string, body: any, observer: Subscriber<T>): void {
        this.confirmationService.confirm({
            message: 'Bu işlemi onaylıyor musunuz?',
            header: "Onay",
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'İptal',
                outlined: true,
                severity: 'secondary'
            },
            acceptButtonProps: {
                label: 'Onayla',
                severity: 'success',
            },
            accept: () => {
                this.http.post<T>(url, body).subscribe({
                    next: (data: T) => {
                        observer.next(data);
                        observer.complete();
                    },
                    error: (err) => {
                        observer.error(err);
                    },
                    complete: () => {
                        observer.complete();
                    }
                });
            },
            reject: () => {
                observer.complete();
            }
        });

    }
    protected postWithoutConfirmation<T>(url: string, body: any, observer: Subscriber<T>): void {
        this.http.post<T>(url, body).subscribe({
            next: (data: T) => {
                observer.next(data);
                observer.complete();
            },
            error: (err) => {
                observer.error(err);
            },
            complete: () => {
                observer.complete();
            }
        });
    }
    put<T>(url: string, body: any, confirmationRequired?: boolean): Observable<T> {
        return new Observable((observer) => {
            const fullUrl = `${this.apiBase}/${url}`;
            if (confirmationRequired) {
                this.putWithConfirmation<T>(fullUrl, body, observer);
            } else {
                this.putWithoutConfirmation<T>(fullUrl, body, observer);
            }
        });
    }
    protected putWithConfirmation<T>(url: string, body: any, observer: Subscriber<T>): void {
        this.confirmationService.confirm({
            message: 'Bu işlemi onaylıyor musunuz?',
            header: "Güncelle",
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'İptal',
                outlined: true,
                severity: 'secondary'
            },
            acceptButtonProps: {
                label: 'Güncelle',
                severity: 'success',
            },
            accept: () => {
                this.http.put<T>(url, body).subscribe({
                    next: (data: T) => {
                        observer.next(data);
                        observer.complete();
                    },
                    error: (err) => {
                        observer.error(err);
                    },
                    complete: () => {
                        observer.complete();
                    }
                });
            },
            reject: () => {
                observer.complete();
            }
        });
    }
    protected putWithoutConfirmation<T>(url: string, body: any, observer: Subscriber<T>): void {
        this.http.put<T>(url, body).subscribe({
            next: (data: T) => {
                observer.next(data);
                observer.complete();
            },
            error: (err) => {
                observer.error(err);
            },
            complete: () => {
                observer.complete();
            }
        });
    }

}