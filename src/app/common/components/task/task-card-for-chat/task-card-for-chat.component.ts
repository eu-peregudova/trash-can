import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'tc-task-card-for-chat[taskId]',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-card-for-chat.component.html',
})
export class TaskCardForChatComponent implements OnChanges {
  @Input() taskId!: string;
  @Output() resolve = new EventEmitter<void>();
  task!: Observable<Task>;

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskId'] && this.taskId) {
      this.task = this.taskService.getTaskById(this.taskId);
    }
  }

  resolveEvent(): void {
    this.resolve.emit();
  }
}
