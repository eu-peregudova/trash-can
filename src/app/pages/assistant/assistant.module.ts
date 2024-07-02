import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TaskCardForChatComponent } from '../../common/components/task/task-card-for-chat/task-card-for-chat.component';
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
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, TaskCardForChatComponent],
})
export class AssistantModule {}
