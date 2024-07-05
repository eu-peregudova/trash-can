import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../../models/task.model';
import { TaskService } from '../../../common/services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-table[tasks]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tasks!: Task[];
  @Output() resolve = new EventEmitter<Task>();
  private ngUnsubscribe$ = new Subject<void>();

  status = TaskStatus;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  resolveEvent(task: Task, status: TaskStatus.Resolved | TaskStatus.Rejected): void {
    task.resolveTask(status);
    this.taskService
      .updateTask(task.taskId, task)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.resolve.emit();
      });
  }

  openEditor(taskId: string): void {
    this.router.navigate(['/editor/', taskId]);
  }
}
