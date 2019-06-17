import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankComponent } from './blank.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';


@NgModule({
  declarations: [
    BlankComponent,
  ],
  imports: [
    CommonModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
