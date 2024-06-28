import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}tasks`).pipe(map((tasks) => tasks.map(Task.fromJSON)));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task[]>(`${this.apiUrl}tasks`, task).pipe(map(Task.fromJSON));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task[]>(`${this.apiUrl}tasks`, task).pipe(map(Task.fromJSON));
  }
}
