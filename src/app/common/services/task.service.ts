import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getTasks(userId: string): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiUrl + 'tasks/' + userId)
      .pipe(
        map((tasks) => tasks.map(Task.fromJSON)),
      );
  }

  updateTask(userId: string, task: Task): Observable<Task> {
    return this.http
      .put<Task>(this.apiUrl + 'tasks/' + userId, task)
      .pipe(map(Task.fromJSON));
  }
}
