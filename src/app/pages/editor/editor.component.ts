import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../../common/services/task.service';
import { Task, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'tc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  taskForm: FormGroup;
  optionsPriority = Object.values(TaskPriority);
  task: Task;
  isNew = true;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(Object.values(TaskPriority));
    this.task = new Task();
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      priority: ['sooner', Validators.required],
      expirationDate: [''],
    });
    this.task.taskId = route.snapshot.params['id'];
    if (this.task.taskId) {
      this.isNew = false;
      this.taskService.getTaskById(this.task.taskId).subscribe((task) => {
        this.task = task;
        this.taskForm = this.fb.group({
          description: [this.task.description, Validators.required],
          priority: [this.task.priority, Validators.required],
          expirationDate: [''],
        });
        console.log(this.task);
      });
    }
  }

  onSubmit(): void {
    const task = Task.fromJSON(this.taskForm.value);
    if (this.isNew) {
      this.taskService.createTask(task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.updateTask(this.task.taskId, task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  isOptionSelected(option: string): boolean {
    return this.taskForm.get('priority')?.value === option;
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onDelete(): void {
    this.taskService.deleteTask(this.task.taskId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
