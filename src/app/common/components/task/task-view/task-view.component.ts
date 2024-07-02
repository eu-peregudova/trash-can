import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../../../models/task.model';

@Component({
  selector: 'tc-task-view[task]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  @Input() task!: Task;
  @Output() resolve = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<void>();

  resolveEvent(): void {
    this.resolve.emit(this.task);
  }

  editEvent(): void {
    this.edit.emit();
  }
}
