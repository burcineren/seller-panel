import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    providePrimeNG({ theme: { preset: Aura } }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      ReactiveFormsModule,
      BrowserModule
    ),
    provideAnimationsAsync(),
    importProvidersFrom(ToastModule),
    ConfirmationService,
    MessageService
  ]
};
