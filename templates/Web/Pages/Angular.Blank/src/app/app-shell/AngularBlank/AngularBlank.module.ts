import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankComponent } from './blank.component';
import { AngularBlankRoutingModule } from './AngularBlank-routing.module';


@NgModule({
  declarations: [
    BlankComponent,
  ],
  imports: [
    CommonModule,
    AngularBlankRoutingModule
  ]
})
export class AngularBlankModule { }
