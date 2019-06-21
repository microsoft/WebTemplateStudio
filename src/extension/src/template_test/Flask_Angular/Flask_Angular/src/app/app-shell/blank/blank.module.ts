import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankComponent } from './blank.component';
import { BlankRoutingModule } from './blank-routing.module';


@NgModule({
  declarations: [
    BlankComponent,
  ],
  imports: [
    CommonModule,
    BlankRoutingModule
  ]
})
export class BlankModule { }
