import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { Sort } from '../../models/sort.model';
import { Task, TaskStatus } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}tasks`;
  constructor(private http: HttpClient) {}

  getTasks(search?: string, filter: TaskStatus = TaskStatus.Created, sort?: Sort): Observable<Task[]> {
    const params = new URLSearchParams();
    params.append('filter', filter);

    if (sort) {
      params.append('sort', sort);
    }
    if (search) {
      params.append('search', search);
    }

    return this.http.get<Task[]>(this.apiUrl + `?${params.toString()}`).pipe(map((tasks) => tasks.map(Task.fromJSON)));
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
