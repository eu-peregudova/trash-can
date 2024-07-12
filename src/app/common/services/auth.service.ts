import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { UserRole } from '../../models/user-role.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}auth`;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  signIn(credentials: { email: string; password: string }) {
    this.userService;
    return this.http.post(this.apiUrl + '/signin', credentials).pipe(
      tap((response: { role: UserRole }) => {
        this.userService.updateUserRole(response.role);
      })
    );
  }

  signUp(userInfo) {
    return this.http.post(this.apiUrl + '/signup', userInfo).pipe(
      tap((response: { role: UserRole }) => {
        this.userService.updateUserRole(response.role);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ valid: boolean; role: UserRole }>(this.apiUrl + '/validate').pipe(
      tap((response: { valid: boolean; role: UserRole }) => {
        this.userService.updateUserRole(response.role);
      }),
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
    location.reload();
    this.userService.updateUserRole(UserRole.Guest);
  }
}
