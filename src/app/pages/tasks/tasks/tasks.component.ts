import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../../common/services/task.service';
import { Task } from '../../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks$!: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
    this.getTasks();
  }

  private getTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  trackByTaskId(i: number, task: Task) {
    return task.taskId;
  }

  onTaskResolved(task: Task): void {
    task.resolveTask();
    this.taskService.updateTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  onAddTask() {
    this.router.navigate(['/editor']);
  }
}
