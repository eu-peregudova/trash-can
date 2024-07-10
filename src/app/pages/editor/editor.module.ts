import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  },
  {
    path: ':id',
    component: EditorComponent,
  },
];

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class EditorModule {}
