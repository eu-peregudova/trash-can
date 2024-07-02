import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../../../common/services/task.service';
import { Task } from '../../../models/task.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tc-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() taskId!: string;
  @Output() resolve = new EventEmitter<Task>();
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe((task) => {
        this.task = task;
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  resolveEvent(): void {
    this.task.resolveTask();
    this.taskService
      .updateTask(this.task.taskId, this.task)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {});
    this.resolve.emit(this.task);
  }

  onEdit(): void {
    this.router.navigate(['/editor/', this.task.taskId]);
  }
}
