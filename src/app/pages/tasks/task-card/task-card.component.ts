import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../../models/task.model';

@Component({
  selector: 'tc-task-card[task]',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() resolve = new EventEmitter<Task>();

  constructor(private router: Router) {}

  resolveEvent(): void {
    this.resolve.emit(this.task);
  }

  onEdit(): void {
    this.router.navigate(['/editor/', this.task.taskId]);
  }
}
