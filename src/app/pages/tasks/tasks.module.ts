import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCardComponent } from './task-card/task-card.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, TaskCardComponent, RouterModule.forChild(routes)],
  exports: [],
})
export class TasksModule {}
