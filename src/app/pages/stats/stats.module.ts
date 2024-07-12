import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
  },
];

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ReactiveFormsModule,
  ],
})
export class StatsModule {}
