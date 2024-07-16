import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Task, TaskStatus } from '../../models/task.model';
import { QueryService } from './query.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}tasks`;
  constructor(
    private http: HttpClient,
    private queryService: QueryService
  ) {}

  getTasks(
    search?: string,
    filter: TaskStatus[] = [TaskStatus.Created],
    sort?: string,
    pagination?: number
  ): Observable<Task[]> {
    const params = new URLSearchParams();
    params.append('filter', filter.join(','));

    if (sort) {
      params.append('sort', sort);
    }

    if (search) {
      params.append('search', search);
    }

    if (pagination) {
      params.append('p', pagination.toString());
    }

    return this.http.get<{ paginationAmount: number; tasks: Task[] }>(this.apiUrl + `?${params.toString()}`).pipe(
      tap((r) => {
        return this.queryService.updatePaginationTotal(+r.paginationAmount);
      }),
      map((r) => r.tasks),
      map((tasks) => tasks.map(Task.fromJSON))
    );
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
