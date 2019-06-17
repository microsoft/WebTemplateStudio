import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GridComponent } from './grid.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';
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
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
