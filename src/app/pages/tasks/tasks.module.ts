import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResolveButtonsComponent } from '../../common/components/resolve-buttons/resolve-buttons.component';
import { TaskCardComponent } from '../../common/components/task/task-card/task-card.component';
import { MaterialModule } from '../../common/modules/material/material.module';
import { QueryBarComponent } from './query-bar/query-bar.component';
import { TableComponent } from './table/table.component';
import { TasksComponent } from './tasks/tasks.component';
import { PriorityColorDirective } from '../../common/directives/priority-color.directive';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  declarations: [TasksComponent, QueryBarComponent, TableComponent],
  imports: [
    CommonModule,
    TaskCardComponent,
    MaterialModule,
    RouterModule.forChild(routes),
    PriorityColorDirective,
    ResolveButtonsComponent,
  ],
  exports: [],
})
export class TasksModule {}
