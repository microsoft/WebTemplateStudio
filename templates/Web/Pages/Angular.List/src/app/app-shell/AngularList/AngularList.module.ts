﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { AngularListRoutingModule } from './AngularList-routing.module';
import { ListFormComponent } from './list-form/list-form.component';
import { ListItemComponent } from './list-item/list-item';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';

@NgModule({
  declarations: [
    ListComponent,
    ListFormComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WarningMessageModule,
    AngularListRoutingModule
  ]
})
export class AngularListModule { }
