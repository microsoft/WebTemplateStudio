import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GridComponent } from './grid.component';
import { GridBoxComponent } from './GridBox/grid-box.component';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';

@NgModule({
  declarations: [
    GridComponent,
    GridBoxComponent
  ],
  imports: [
    CommonModule,
    WarningMessageModule,
    RouterModule.forChild([
      { path: 'AngularGrid', component: GridComponent}
    ]),
  ]
})
export class AngularGridModule { }
