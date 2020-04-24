import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';


@NgModule({
  declarations: [Param_SourceName_PascalComponent],
  imports: [
    CommonModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
