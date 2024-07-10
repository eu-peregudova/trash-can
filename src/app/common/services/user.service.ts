import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';
import { UserRole } from '../../models/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}auth`;
  private userRoleSubject = new BehaviorSubject(UserRole.Guest);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateUserRole(role: UserRole) {
    this.userRoleSubject.next(role);
  }

  requestAssistantAccess() {
    return this.http.post(this.apiUrl + '/assistant', {}).pipe(
      tap((response: { role: UserRole }) => {
        this.updateUserRole(response.role);
      })
    )
  }
}
