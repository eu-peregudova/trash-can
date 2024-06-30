import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}tasks`;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(map((tasks) => tasks.map(Task.fromJSON)));
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + `/${id}`).pipe(map(Task.fromJSON));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task[]>(this.apiUrl, task).pipe(map(Task.fromJSON));
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<Task[]>(this.apiUrl + `/${id}`, task).pipe(map(Task.fromJSON));
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${id}`);
  }
}
