import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { TaskService } from '../../../common/services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'tc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnDestroy {
  tasks$!: Observable<Task[]>;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private getTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  trackByTaskId(i: number, task: Task): string {
    return task.taskId;
  }

  onTaskResolved(): void {
    this.getTasks();
  }

  onAddTask(): void {
    this.router.navigate(['/editor']);
  }
}
