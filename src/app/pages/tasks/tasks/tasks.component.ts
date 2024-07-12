import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, switchMap, tap } from 'rxjs';

import { QueryService } from '../../../common/services/query.service';
import { SpinnerService } from '../../../common/services/spinner.service';
import { TaskService } from '../../../common/services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'tc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  combinedQuery$ = this.queryService.combined$;
  currentPage$ = this.queryService.currentPage$;
  cardView = true;

  loadMoreShowSubject = new BehaviorSubject(false);
  loadMoreShow$ = this.loadMoreShowSubject.asObservable();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private queryService: QueryService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasks$ = this.combinedQuery$.pipe(
      switchMap(([_refresh, ...rest]) => {
        this.spinnerService.showSpinner();
        return this.taskService.getTasks(...rest);
      }),
      tap(() => {
        if (
          this.queryService.getTotalPages() === this.queryService.getCurrentPage() ||
          this.queryService.getTotalPages() === 0
        ) {
          this.loadMoreShowSubject.next(false);
        } else {
          this.loadMoreShowSubject.next(true);
        }
      }),
      delay(300),
      tap(() => {
        this.spinnerService.hideSpinner();
      })
    );
  }

  trackByTaskId(i: number, task: Task): string {
    return task.taskId;
  }

  onTaskResolved(): void {
    this.queryService.refreshQuery();
  }

  onAddTask(): void {
    this.router.navigate(['/editor']);
  }

  onViewChange(): void {
    this.cardView = !this.cardView;
  }

  onLoadMore(): void {
    this.queryService.updatePagination();
    this.queryService.refreshQuery();
  }
}
