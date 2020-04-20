import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularBlankComponent } from './Param_SourceName_Kebab.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';


@NgModule({
  declarations: [AngularBlankComponent],
  imports: [
    CommonModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
