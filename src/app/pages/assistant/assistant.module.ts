import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TaskCardForChatComponent } from '../../common/components/task/task-card-for-chat/task-card-for-chat.component';
import { AssistantRequestedDirective } from '../../common/directives/assistant-requested.directive';
import { ShowAssistantDirective } from '../../common/directives/show-assistant.directive';
import { AssistantComponent } from './assistant.component';
import { FastPromptComponent } from './fast-prompt/fast-prompt.component';
import { AssistantService } from './service/assistant.service';

const routes: Routes = [
  {
    path: '',
    component: AssistantComponent,
  },
];

@NgModule({
  declarations: [AssistantComponent, FastPromptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TaskCardForChatComponent,
    ShowAssistantDirective,
    AssistantRequestedDirective,
  ],
  providers: [AssistantService],
})
export class AssistantModule {}
