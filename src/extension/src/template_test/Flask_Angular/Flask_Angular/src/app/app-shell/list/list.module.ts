import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { ListFormComponent } from './list-form/list-form.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

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
    ListRoutingModule
  ]
})
export class ListModule { }
