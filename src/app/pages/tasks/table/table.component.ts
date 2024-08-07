import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '../../../common/services/task.service';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'tc-table[tasks]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tasks!: Task[];
  @Output() resolveEvent = new EventEmitter<Task>();
  private ngUnsubscribe$ = new Subject<void>();

  status = TaskStatus;
  priority = TaskPriority;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  resolve(status: Exclude<TaskStatus, TaskStatus.Created>, task: Task): void {
    task.resolveTask(status);
    this.taskService
      .updateTask(task.taskId, task)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.resolveEvent.emit();
      });
  }

  openEditor(taskId: string): void {
    this.router.navigate(['/editor/', taskId]);
  }
}
