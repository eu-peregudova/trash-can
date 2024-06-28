import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AssistantComponent } from './assistant.component';

const routes: Routes = [
  {
    path: '',
    component: AssistantComponent,
  },
];

@NgModule({
  declarations: [AssistantComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class AssistantModule {}
