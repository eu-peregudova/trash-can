import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TaskCardComponent } from '../tasks/task-card/task-card.component';
import { AssistantComponent } from './assistant.component';
import { FastPromptComponent } from './fast-prompt/fast-prompt.component';

const routes: Routes = [
  {
    path: '',
    component: AssistantComponent,
  },
];

@NgModule({
  declarations: [AssistantComponent, FastPromptComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, TaskCardComponent],
})
export class AssistantModule {}
