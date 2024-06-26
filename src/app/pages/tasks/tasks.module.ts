import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskCardComponent } from './task-card/task-card.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  declarations: [TasksComponent, TaskCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TasksModule {}
