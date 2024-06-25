import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + 'tasks/' + userId);
  }

  updateTask(userId: string, task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + 'tasks/' + userId, task)
  }
}
