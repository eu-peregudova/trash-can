import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'assistant',
    loadChildren: () => import('./pages/assistant/assistant.module').then((m) => m.AssistantModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./pages/editor/editor.module').then((m) => m.EditorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
