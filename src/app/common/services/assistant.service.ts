import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getSuggestion(message: Message[]): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}assistant`, message);
  }
}
