import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../common/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  taskForm: FormGroup;
  optionsPriority = Object.values(TaskPriority);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      priority: ['sooner', Validators.required],
      expirationDate: [''],
    });
  }

  onSubmit(): void {
    const task = Task.fromJSON(this.taskForm.value);
    this.taskService.createTask(task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  isOptionSelected(option: string): boolean {
    return this.taskForm.get('priority')?.value === option;
  }
}
