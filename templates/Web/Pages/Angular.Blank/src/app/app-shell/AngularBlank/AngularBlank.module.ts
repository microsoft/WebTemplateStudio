import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlankComponent } from './blank.component';

@NgModule({
  declarations: [
    BlankComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'AngularBlank', component: BlankComponent},
    ]),
  ]
})
export class AngularBlankModule { }
