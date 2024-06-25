import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'tc-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input()
  task!: Task;
  @Output() resolve = new EventEmitter<string>(); 

  onResolve() {
    this.resolve.emit(this.task.taskId); 
  }
}
