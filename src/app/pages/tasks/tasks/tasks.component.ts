import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../../common/services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'tc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.getTasks();
  }
  
  private getTasks(): void {
    this.tasks$ = this.taskService.getTasks('1');
  }

  trackByTaskId(i: number, task: Task) {
    return task.taskId
  }

  onTaskResolved(task: Task): void {
    task.resolveTask();
    this.taskService.updateTask('1', task).subscribe(() => {
      this.getTasks();
    });
  }
}
