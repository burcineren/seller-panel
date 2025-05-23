import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const API_BASE = new InjectionToken<string>('API_BASE');

@NgModule({
    imports: [HttpClientModule],
    providers: [
        { provide: API_BASE, useValue: 'http://localhost:3000' }
    ]
})
export class ApiModule { }