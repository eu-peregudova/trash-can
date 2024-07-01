import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '../../common/services/task.service';
import { Task, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'tc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnDestroy {
  taskForm: FormGroup;
  optionsPriority = Object.values(TaskPriority);
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      priority: ['sooner', Validators.required],
      expirationDate: [''],
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSubmit(): void {
    const task = Task.fromJSON(this.taskForm.value);
    this.taskService
      .createTask(task)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  isOptionSelected(option: string): boolean {
    return this.taskForm.get('priority')?.value === option;
  }
}
