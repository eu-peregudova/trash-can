import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}auth`;

  constructor(private http: HttpClient) {}

  signIn(credentials: { email: string; password: string }) {
    return this.http.post(this.apiUrl + '/signin', credentials);
  }

  signUp(userInfo) {
    return this.http.post(this.apiUrl + '/signup', userInfo);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(this.apiUrl + '/validate').pipe(
      map((response) => {
        console.log(response);
        return response.valid;
      }),
      catchError((error) => {
        console.error('Validation failed', error);
        return of(false);
      })
    );
  }

  signOut() {
    localStorage.removeItem('userToken');
  }
}
