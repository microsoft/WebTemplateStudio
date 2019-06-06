import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { GridComponent } from './grid.component';
import { GridBoxComponent } from './grid-box/grid-box.component';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';

@NgModule({
  declarations: [
    GridComponent,
    GridBoxComponent
  ],
  imports: [
    CommonModule,
    WarningMessageModule,
    MatIconModule,
    RouterModule.forChild([
      { path: 'AngularGrid', component: GridComponent}
    ]),
  ]
})
export class AngularGridModule { }
