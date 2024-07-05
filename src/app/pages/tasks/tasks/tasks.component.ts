import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, delay, switchMap } from 'rxjs';

import { QueryService } from '../../../common/services/query.service';
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
  cardView = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.combinedQuery$.pipe(
      delay(500),
      switchMap(([refresh, ...rest]) => {
        return this.taskService.getTasks(...rest);
      })
    )
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
}
