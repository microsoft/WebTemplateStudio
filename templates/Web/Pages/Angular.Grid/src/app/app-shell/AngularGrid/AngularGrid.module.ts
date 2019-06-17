import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GridComponent } from './grid.component';
import { AngularGridRoutingModule } from './AngularGrid-routing.module';
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
    AngularGridRoutingModule
  ]
})
export class AngularGridModule { }
