import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/enviroment';
import { Message } from '../../../models/message.model';

@Injectable()
export class AssistantService {
  private apiUrl = `${environment.apiBaseUrl}assistant`;

  constructor(private http: HttpClient) {}

  getSuggestion(message: Message[]): Observable<string> {
    return this.http.post<string>(this.apiUrl, message);
  }
}
