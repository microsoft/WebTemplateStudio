import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

@NgModule({
  declarations: [Param_SourceName_PascalComponent, FormComponent, ListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    WarningMessageModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
