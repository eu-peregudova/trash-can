import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}auth`;

  constructor(private http: HttpClient) { }

  isMegaAuthorized(): Observable<boolean> {
    return this.http.get<{ isMegaUser: boolean }>(this.apiUrl + '/authorize').pipe(
      map((response) => response.isMegaUser),
      catchError((error) => {
        console.error('Authorization failed, not mega user', error);
        return of(false);
      })
    );
  }

  isAssistantAuthorized(): Observable<boolean> {
    console.log('Checking assistant authorization');
    return this.http.get<{ assistantOn: boolean; accessRequested: boolean }>(this.apiUrl + '/authorize').pipe(
      map((response) => {
        console.log(response);
        return response.assistantOn;
      }),
      catchError((error) => {
        console.error('Authorization failed, assistant off', error);
        return of(false);
      })
    );
  }

  isAssistantRequested(): Observable<boolean> {
    console.log('Checking assistant request');
    return this.http.get<{ assistantOn: boolean; accessRequested: boolean }>(this.apiUrl + '/authorize').pipe(
      map((response) => {
        console.log(response);
        return response.accessRequested;
      }),
      catchError((error) => {
        console.error('Authorization failed, assistant off', error);
        return of(false);
      })
    );
  }

  requestAssistantAccess() {
    return this.http.post(this.apiUrl + '/assistant', {});
  }
}
