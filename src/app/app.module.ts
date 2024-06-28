import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './common/components/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, NavigationComponent, HttpClientModule],
  providers: [
    RouterLink,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (): HttpInterceptor => ({
        intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
          const clonedRequest = req.clone({
            setHeaders: {
              'user-id': '1',
            },
          });
          return next.handle(clonedRequest);
        },
      }),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
