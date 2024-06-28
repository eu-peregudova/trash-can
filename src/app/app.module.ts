import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NavigationComponent } from './common/components/navigation/navigation.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NavigationComponent,
    HttpClientModule,
  ],
  providers: [
    RouterLink,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (): HttpInterceptor => ({
        intercept(
          req: HttpRequest<any>,
          next: HttpHandler,
        ): Observable<HttpEvent<any>> {
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
