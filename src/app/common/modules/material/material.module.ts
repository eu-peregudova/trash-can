import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [MatSelectModule, MatButtonToggleModule],
})
export class MaterialModule {}
