import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
    ),
    providePrimeNG({ 
      theme: {
        preset: Aura
      }
    }),
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
  ]
};
