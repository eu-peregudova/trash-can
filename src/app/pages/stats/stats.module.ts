import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '', component: StatsComponent,
}];

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
export class StatsModule {
}
