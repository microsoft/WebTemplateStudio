import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningMessageComponent } from './warning-message.component';

@NgModule({
  declarations: [
    WarningMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WarningMessageComponent
  ]
})
export class WarningMessageModule { }
