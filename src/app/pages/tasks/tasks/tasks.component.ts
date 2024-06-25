import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from 'src/app/common/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'tc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks('1').subscribe((tasks) => {
      this.tasks = tasks.filter((t) => t.resolveDate === null);
    });
  }

  onTaskResolved(taskId: string): void {
    const task = this.tasks.find((t) => t.taskId === taskId);
    if (task) {
      task.resolveDate = new Date().toISOString();
      this.taskService.updateTask('1', task).subscribe(() => {
        this.getTasks();
      });
    }
  }
}
